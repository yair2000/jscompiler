import { Dispatch } from "redux"

import { saveCells } from "./api/cellAPI"
import { CellAction } from "./interfaces/cellInterfaces"
import { RootState } from "./reducers/reducerCombiner";
import { ActionType } from "../constants/actionConstants"

export const reduxPersist = ({ dispatch, getState }: {
  dispatch: Dispatch<CellAction>;
  getState: () => RootState;
}) =>{
  let timer: NodeJS.Timeout;

  return (next: (action: CellAction) => void) =>{
    return (action: CellAction) =>{
      next(action);
      if([
          ActionType.MOVE_CELL,
          ActionType.UPDATE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.DELETE_CELL,
        ].includes(action.type)
      ){
        if(timer){
          clearTimeout(timer);
        }
        timer = setTimeout(() =>{
          saveCells()(dispatch, getState);
        }, 500);
      }
    };
  };
};