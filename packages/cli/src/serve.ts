import path from "path";
import { Command } from "commander";
import { serve } from "local-api";

interface LocalApiError{
  code: string;
}

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
.command("serve [filename]") // Command name
.description("Open a file for editing") // Command description
.option("-p, --port <number>", "Port to run the server", "4000") // Open the file in a port of your choice
.action(async(filename = "cells.js", options: { // Command execution
  port: string }) =>{
  const isLocalApiError = (err: any): err is LocalApiError =>{
    return typeof err.code === "string";
  }

  try{
    const dir = path.join(process.cwd(), path.dirname(filename));
    await serve(
      parseInt(options.port),
      path.basename(filename),
      dir,
      !isProduction
    );
    console.log(`Opened ${filename}. Go to http://localhost:${options.port} to edit the file`)
  }
  catch(err){
    if(isLocalApiError(err)){
      if(err.code === "EADDRINUSE"){
        console.error("This port is already used. Try using a different one");
      }
    }
    else if(err instanceof Error){
      console.log("Error: ", err.message);
    }
    process.exit(1);
  }
});