import { Dispatch } from "redux";

import { ActionType } from "../../constants/actionConstants";
import {
  BundleStartAction,
  BundleCompleteAction, 
  BundleAction} from "../interfaces/actionInterfaces";

import bundler from "../../bundler";

export const createBundle = (cellId: string, input: string) =>{
  return async(dispatch: Dispatch<BundleAction>) =>{
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId
      },
    });

    const result = await bundler(input);
    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result
      },
    });
  }
};

// export const completeBundle = (id: string, content: string): BundleCompleteAction =>{
// };