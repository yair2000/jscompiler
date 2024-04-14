import React, { useEffect, useRef, memo } from "react";

import { Cell } from "../redux";
import ActionBar from "./actionBar";
import "./styles/preview.css";
import "./styles/actionBar.css";

interface PreviewProps{
  code: string;
  err: string;
  cell: Cell;
}

const Preview: React.FC<PreviewProps> = memo(({ code, err, cell }) =>{
  const iframe = useRef<HTMLIFrameElement>(null);

  useEffect(() =>{
    const setupIframe = () =>{
      if(iframe.current){
        const html = `
          <html>
            <head></head>
            <body>
              <div id="root"/>
              <script>
                const handleError = (error) =>{
                  const root = document.querySelector('#root');
                  root.innerHTML = '<div style="color: red;"><h2>Runtime Error</h2>' + error + '</div>';
                };

                window.addEventListener('error', (event) =>{
                  event.preventDefault();
                  handleError(event.error);
                });

                window.addEventListener('message', (event) =>{
                  try{
                    eval(event.data);
                  }
                  catch(error){
                    handleError(error);
                  }
                }, false);
              </script>
            </body>
          </html>
        `;
        iframe.current.onload = () =>{
          // Prints the output of the code in the iframe element
          iframe.current!.contentWindow!.postMessage(code, "*");
        };

        iframe.current.srcdoc = html;
      }
    }
    setupIframe();
  }, [code]);

  return(
    <div className="preview-wrapper">
      <iframe
      ref={iframe}
      title="preview"
      sandbox="allow-scripts"/>
      {err && (
        <div className="preview-error">
          {err}
        </div>
      )}
      <div style={{ display: "none" }}>
        <div className="action-bar">
          <ActionBar id={cell.id}/>
        </div>
      </div>
    </div>
  );
});

export default Preview;