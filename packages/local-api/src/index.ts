import express from "express";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";

import { createCellsRouter } from "./cell-routes";

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean) =>{
  
  const app = express();
  app.use(createCellsRouter(filename, dir));
  
  if(useProxy){ // Local development
    app.use(createProxyMiddleware({
      target: "http://127.0.0.1:3000",
      ws: true,
      logLevel: "silent"
    }));
  }
  else{ // Run the project on another person's computer
    const packagePath = require.resolve("local-client/build/index.html");
    app.use(express.static(path.dirname(packagePath)));
  }

  // Prints a success or error message of the server
  return new Promise<void>((resolve, reject) =>{
    app.listen(port, resolve).on("error", reject)
  });
}