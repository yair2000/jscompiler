import { useMemo } from "react";

import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../redux/reducers/reducerCombiner";

export const useTypedSelector:
TypedUseSelectorHook<RootState> = (selector) =>{
  const result = useSelector(selector, shallowEqual);
  return useMemo(() => result, [result]);
};

const shallowEqual = (a: any, b: any) =>{
  if(a === b){
    return true;
  }
  
  if(typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if(keysA.length !== keysB.length){
    return false;
  }

  for(let key of keysA){
    if(!keysB.includes(key) || a[key] !== b[key]){
      return false;
    }
  }
  return true;
};