import { combineReducers } from 'redux';
import cellReducer from "./cellReducer";
import bundleReducer from "./bundleReducer";

const reducerCombiner = combineReducers({
  cells: cellReducer,
  bundles: bundleReducer
});

export default reducerCombiner;

export type RootState = ReturnType<typeof reducerCombiner>;