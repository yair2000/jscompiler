import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell{
  id: string;
  content: string;
  type: "text" | "code"
}

interface LocalApiError{
  code: string;
}

export const createCellsRouter = (filename: string, dir: string) =>{
  const router = express.Router();
  router.use(express.json());
  
  const fullPath = path.join(dir, filename);

  router.get("/cells", async(req, res) =>{
    res.setHeader('Cache-Control', 'no-store');
    
    const isLocalApiError = (err: any): err is LocalApiError =>{
      return typeof err.code === "string";
    };

    try{
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      res.send(JSON.parse(result));
    }
    catch(err){
      if(isLocalApiError(err)){
        if(err.code === "ENOENT"){ // ENOENT - The error indicating that a file doesn't exist
          // Creates a file with default cells
          await fs.writeFile(fullPath, "[]", "utf-8");
          res.send([]);
        }
      }
      else{
        throw err;
      }
    }
  });
  router.post("/cells", async(req, res) =>{
    try{
      const { cells }: { cells: Cell[] } = req.body;
      // File path, data, encoding type
      await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");
      res.status(200).json({ status: "OK" });
    }
    catch(err){
      console.error("Error occurred while saving cells:", err);
      res.status(500).json({ error: "Failed to save cells" });
    }
  });

  return router;
}