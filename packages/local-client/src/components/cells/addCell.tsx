import { MdOutlineAdd } from "react-icons/md";

import { useActions } from "../../hooks/useActions";
import "../styles/addCell.css";

interface AddCellProps{
  previousCellID: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellID }) =>{
  const { insertCellAfter } = useActions();

  return(
    <div className="addCell">
      <div className="addButtons">
        <button className="btn btn-warning rounded-pill my-2"
        onClick={() => insertCellAfter(previousCellID, "code")}>
          <MdOutlineAdd/>Code
        </button>

        <button className="btn btn-warning rounded-pill my-2"
        onClick={() => insertCellAfter(previousCellID, "text")}>
          <MdOutlineAdd/>Text
        </button>
      </div>
      <div className="divider"/>
    </div>
  )
}

export default AddCell;