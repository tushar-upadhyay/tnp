import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "jotai";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(

    <Provider>
      <Router>
        <App />
      </Router>
    </Provider>,
  rootElement
);
