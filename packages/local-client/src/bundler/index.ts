import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkgPathPlugin";
import { fetchPlugin } from "./plugins/fetchPlugin";

let service: esbuild.Service;

const bundler =  async(rawCode: string) =>{
  if(!service){
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm"
    });
  }

  try{
    const result = await service.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
         global: 'window',
      },
      jsxFactory: "React.createElement",
      jsxFragment: "React.Fragment"
    });
    return{
      code: result.outputFiles[0].text,
      err: ""
    }
  }
  catch(err){
    if(err instanceof Error){
      return{
        code: "",
        err: err.message
      }
    }
    else{
      throw err
    }
  }
}

export default bundler;