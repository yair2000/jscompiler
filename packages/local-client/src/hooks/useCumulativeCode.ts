import { useTypedSelector } from "./useTypedSelector";

export const useCumulativeCode = (cellID: string) =>{
  return useTypedSelector((state) =>{
    // Getting the data and order of the cells
    // from the cell piece of state
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const func = `
      import React from "react";
      import ReactDOM from "react-dom";
    
      var show = (value) =>{
      const root = document.querySelector("#root");
    
      if(typeof value === "object"){
        if(value.$$typeof && value.props){
          ReactDOM.render(value, root); // JSX Element
        }
        else{
          root.innerHTML = JSON.stringify(value); // Object
        }
      }
      else{
        root.innerHTML = value; // Value
      }
    }
    `;
    const funcNoOperation = "var show = () =>{}";
    const cumulativeCode = [];
    for(let c of orderedCells){
      if(c.type === "code"){
        if(c.id === cellID){
          cumulativeCode.push(func); // Execute the code in whatever code cell we write in
        }
        else{
          cumulativeCode.push(funcNoOperation); // Doesn't execute the written code in other code cells
        }
        // Adds the written code to the cumulativeCode array
        cumulativeCode.push(c.content);
      }
      // Stops iteration at the last code cell
      if(c.id === cellID){
        break;
      }
    }
    return cumulativeCode;
  }).join("\n");
};