import React, { useCallback, useEffect, memo } from "react";
import { OnChange } from "@monaco-editor/react";

import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useCumulativeCode } from "../hooks/useCumulativeCode";
import { Cell } from "../redux";
import CodeEditor from "./codeEditor";
import Preview from "./preview";
import Resizable from "./resizable";
import "./styles/codeCell.css";

interface CodeCellProps{
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = memo(({ cell }) =>{
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() =>{
    if(!bundle){
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async() =>{
      createBundle(cell.id, cumulativeCode);
    }, 1000);

    return() =>{
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id]);

  const handleEditorChange: OnChange = useCallback((value = "") =>{
    updateCell(cell.id, value);
  },
  [cell.id, updateCell]);

  return(
    <>
      <Resizable direction="vertical">
        <div className="h-100 d-flex">
          <Resizable direction="horizontal">
            <div className="position-relative w-100">
              <CodeEditor
              initialValue={cell.content}
              onChange={handleEditorChange}/>
            </div>
          </Resizable>
          <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress hidden={!bundle} max="100"/>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} cell={cell}/>
          )}
          </div>
        </div>
      </Resizable>
    </>
  );
});

export default CodeCell;