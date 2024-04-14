import axios from "axios";
import { Dispatch } from "redux";

import { ActionType } from "../../constants/actionConstants";
import { Cell, CellTypes } from "../../constants/cellConstants";
import {
  DeleteCellAction,
  Direction,
  CellAction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
  FetchCellsAction,
  FetchCellsCompleteAction,
  FetchCellsErrorAction } from "../interfaces/cellInterfaces";
import { RootState } from "../reducers/reducerCombiner";

export const updateCell = (id: string, content: string): UpdateCellAction =>{
  return{
    type: ActionType.UPDATE_CELL,
    payload: { id, content }
  };
};
  
export const deleteCell = (id: string): DeleteCellAction =>{
  return{
    type: ActionType.DELETE_CELL,
    payload: id
  };
};
  
export const moveCell = (
  id: string,
  direction: Direction):
  MoveCellAction =>{
  return{
    type: ActionType.MOVE_CELL,
    payload: { id, direction }
  };
};
  
export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes):
  InsertCellAfterAction =>{
  return{
    type: ActionType.INSERT_CELL_AFTER,
    payload: { id, type: cellType }
  };
};

// A function that returns a redux thunk
export const fetchCells = () =>{
  return async(dispatch: Dispatch<CellAction>) =>{
    dispatch({ type: ActionType.FETCH_CELLS });

    try{
      const { data }: { data: Cell[] } = await axios.get("/cells");
      dispatch({
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: data
      });
    }
    catch(err){
      if(err instanceof Error){
        dispatch({
          type: ActionType.FETCH_CELLS_ERROR,
          payload: err.message
        });
      }
    }
  }
};

// A function that returns a redux thunk
export const saveCells = () =>{
  return async(
    dispatch: Dispatch<CellAction>,
    getState: () =>RootState) =>{
    const { cells: { data, order } } = getState();
    const cells = order.map(id => data[id]);

    try{
      await axios.post("/cells", { cells });
    }
    catch(err){
      if(err instanceof Error){
        dispatch({
        type: ActionType.SAVE_CELLS_ERROR,
        payload: err.message
    });
  }}
}};