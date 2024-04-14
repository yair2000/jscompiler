import { useDispatch } from "react-redux";
import { bindActionCreators, ActionCreatorsMapObject } from "redux";

import { actionCreators as cellActionCreators } from "../redux";
import { bundleCreators as bundleActionCreators } from "../redux";

type ActionCreators =
typeof cellActionCreators & typeof bundleActionCreators;

export const useActions = () =>{
  const dispatch = useDispatch();

  const actionCreators: ActionCreators ={
    ...cellActionCreators,
    ...bundleActionCreators,
  };

  return bindActionCreators<ActionCreators, ActionCreatorsMapObject>(
    actionCreators, dispatch
  );
}