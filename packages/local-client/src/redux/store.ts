import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";

import { reduxPersist } from "./reduxPersist";
import reducerCombiner from "./reducers/reducerCombiner";
// import { ActionType } from "../constants/actionConstants";

export const store = createStore(
  reducerCombiner,
  {},
  applyMiddleware(reduxPersist, thunk)
);

// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: "code"
//   },
// });

// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: "text"
//   },
// });