import { Fragment, useEffect } from "react";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import AddCell from "./addCell";
import CellListItem from "./cellListItem";
import "../styles/cellList.css";

const CellList: React.FC = () =>{
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );
  const { fetchCells } = useActions();

  useEffect(() =>{
    fetchCells();
  },[]);

  const renderedCells = cells.map((cell) =>(
    <Fragment key={cell.id}>
      <CellListItem key={cell.id} cell={cell}/>
      <AddCell previousCellID={cell.id}/>
    </Fragment>
  ));

  return(
    <div className="cell-list">
      <AddCell previousCellID={null}/>
      {renderedCells}
    </div>
  )
}

export default CellList;