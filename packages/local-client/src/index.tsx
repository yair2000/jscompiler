import { useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import { store } from "./redux/store";
import CellList from "./components/cells/cellList";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el!);

const App = () =>{
  useEffect(() =>{
    const body = document.getElementsByTagName("body");
    body[0].style.backgroundColor = "#f5f5f5";
  });

  return(
    <div>
      <Navbar bg="dark">
        <Navbar.Brand
          style={
            {
              boxShadow: "initial",
              fontSize: "3rem",
              color: "white",
              marginLeft: "0.5rem"
            }}>JS Compiler
        </Navbar.Brand>
      </Navbar>
      <CellList/>
    </div>
  );
};

root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);