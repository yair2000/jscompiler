import { FaCaretUp, FaCaretDown, FaTrash } from "react-icons/fa6";

import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import "./styles/actionBar.css";

interface ActionBarProps{
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) =>{
  const { moveCell, deleteCell } = useActions();

  const cells = useTypedSelector(({cells: { order, data }}) =>{
    return order.map((id) =>{
      return data[id]
    });
  });

  const codeCellsCount = cells.filter(cell => cell.type === "code").length;
  const disableButtons = codeCellsCount === 1;

  return(
    <div className="action-bar">
      <button
      style={{ backgroundColor: "orange", borderColor: "transparent" }}>
        <FaCaretUp
        size="1.2rem"
        style={{ color: "black" }}
        onClick={() => moveCell(id, "up")}/>
      </button>

      <button
      style={{ backgroundColor: "orange", borderColor: "transparent" }}>
        <FaCaretDown
        size="1.2rem"
        style={{ color: "black" }}
        onClick={() => moveCell(id, "down")}/>
      </button>

      <button disabled={disableButtons}
      style={{ backgroundColor: "orange", borderColor: "transparent" }}>
        <FaTrash
        size="0.85rem"
        style={{ color: "black" }}
        onClick={() => deleteCell(id)}/>
      </button>
    </div>
  )
}

export default ActionBar;