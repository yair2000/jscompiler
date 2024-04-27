import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "fileCache"
});

export const fetchPlugin = (inputCode: string) =>{
  return{
    name: "fetchPlugin",
    setup(build: esbuild.PluginBuild){
      // Load a file named index.js
      build.onLoad({ filter: /(^index\.js$)/}, () =>{
        return{
            loader: "jsx",
            contents: inputCode,
        };
      });

      build.onLoad({ filter: /.*/ }, async(args: any) =>{
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if(cachedResult){
          return cachedResult;
        }
      });

      // Load a css file
      build.onLoad({ filter: /.css$/ }, async(args: any) =>{
        const { data, request } =  await axios.get(args.path);
        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
        `;
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: contents,
          resolveDir: new URL("./", request.responseURL).pathname
        }
        await fileCache.setItem(args.path, result);
        return result;
      });

      // Attempts to load up all other files
      build.onLoad({ filter: /.*/ }, async(args: any) =>{
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult ={
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname
        }

        await fileCache.setItem(args.path, result);
        return result;
      });
    }}
}