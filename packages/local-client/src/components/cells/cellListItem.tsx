import { Cell } from "../../constants/cellConstants";
import ActionBar from "../actionBar";
import CodeCell from "../codeCell";
import TextEditor from "../textEditor";
import "../styles/actionBar.css";

interface CellListItemProps{
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) =>{
  let child: JSX.Element;

  if(cell.type === "code"){
    child =
    <>
      <div className="action-bar-wrapper mb-3 bg-light">
        <CodeCell cell={cell}/>
      </div>
    </>
  }
  else{
    child = <TextEditor cell={cell}/>
  }

  return(
    <div>
      <ActionBar id={cell.id}/>
      {child}
    </div>
  )
}

export default CellListItem;