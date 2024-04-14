import React from "react";
import MonacoEditor, { OnChange } from "@monaco-editor/react";

interface EditorProps{
  initialValue: string;
  onChange: OnChange;
}

const CodeEditor: React.FC<EditorProps> = ({ initialValue, onChange }) =>{
  
  return(
    <MonacoEditor
    onChange={onChange}
    defaultLanguage="javascript"
    height="100%"
    theme="vs-dark"
    defaultValue={initialValue}
    options={{
      automaticLayout: true,
      folding: true,
      fontSize: 14,
      lineNumbersMinChars: 3,
      minimap: {
        enabled: false, // Hides the scroll inside the code editor
      },
      scrollBeyondLastLine: false,
      showUnused: true,
      tabSize: 2,
      wordWrap: "wordWrapColumn", // Wraps the code in the same line
      scrollbar: {
        verticalScrollbarSize: 6, // Increase scrollbar size for easier scrolling
        horizontalScrollbarSize: 6,
      }
    }}/>
  )
}

export default CodeEditor;