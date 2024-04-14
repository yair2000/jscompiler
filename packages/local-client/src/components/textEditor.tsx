import { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";

import { Cell } from "../redux";
import { useActions } from "../hooks/useActions";
import "./styles/textEditor.css";

interface TextEditorProps{
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) =>{
  const [editing, setEditing] = useState(false);
  
  const ref = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();

  useEffect(() =>{
    const listener = (event: MouseEvent) =>{
      if(ref.current && event.target && ref.current.contains(event.target as Node)){
        return;
      }
      setEditing(false);
    }
    document.addEventListener("click", listener, { capture: true });

    return () =>{
      document.removeEventListener("click", listener, { capture: true });
    }
  }, []);

  if(editing){
    return(
      <div ref={ref}>
        <MDEditor value={cell.content}
         onChange={(value) => updateCell(cell.id, value || "")}/>
      </div>
    )
  }

  return(
    <div onClick={() => setEditing(true)}>
      <Card>
        <Card.Body>
          <MDEditor.Markdown
          source={cell.content || "Click to edit"}/> 
        </Card.Body>
      </Card>
    </div>
  )
}

export default TextEditor;