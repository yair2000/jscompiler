import { ActionType } from "../../constants/actionConstants";

export interface BundleStartAction{
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: string;
  }
}

export interface BundleCompleteAction{
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string
    }
  }
}

export type BundleAction = 
| BundleStartAction
| BundleCompleteAction