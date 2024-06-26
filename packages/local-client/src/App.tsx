import { useEffect, useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";

import { unpkgPathPlugin } from "./plugins/unpkgPathPlugin";
import { fetchPlugin } from "./plugins/fetchPlugin";

const App = () =>{
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const ref = useRef<any>();

  const startService = async() =>{
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm"
    });
  }
  useEffect(() =>{
    startService()
  }, []);

  const onClick = async() =>{
    if(!ref.current){
      return;
    }
    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input)
      ],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window"
      }
    });
    setCode(result.outputFiles[0].text);

    try{
      // eslint-disable-next-line no-eval
      eval(result.outputFiles[0].text);
    }
    catch(error){
      alert(error);
    }
  }

  return(
    <div>
      <textarea value={input}
      onChange={e => setInput(e.target.value)}/>
      <div>
        <button onClick={onClick}/>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

export default App;