import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'react-confirm-alert/src/react-confirm-alert.css' 


import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {createStore} from "redux"
import { reducers } from "./store/store.js";

const store = createStore(reducers)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
