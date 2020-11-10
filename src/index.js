import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../node_modules/jquery/dist/jquery.min";
import "./../node_modules/popper.js/dist/umd/popper.min";
import "./../node_modules/bootstrap/dist/js/bootstrap.min";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./JSS_StyledComponent/redux/reducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
