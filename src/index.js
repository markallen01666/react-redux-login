import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";

const initialState = {
  signedIn: false,
  userName: ""
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SIGNIN":
      return Object.assign({}, state, {
        signedIn: true,
        userName: "Fred Bloggs"
      });
    case "SIGNOUT":
      return Object.assign({}, state, {
        signedIn: false,
        userName: ""
      });
    default:
      return state;
  }
}

const store = createStore(reducer);
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
