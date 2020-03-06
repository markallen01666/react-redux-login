// React / Redux / Firebase / Material UI app to demonstrate login/logout/authentication

import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";

// redux store initial values
const initialState = {
  firebaseInitialised: false,
  signedIn: false,
  userName: ""
};

// redux store reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIALISED": // firebase connection established
      return Object.assign({}, state, {
        firebaseInitialised: true
      });
    case "SIGNIN": // user successfully signed in
      console.log("State: ", state.signedIn, "PL: ", action.payload);
      return Object.assign({}, state, {
        signedIn: true,
        ...action.payload
      });
    case "SIGNOUT": // user successfully signed out
    console.log("State: ", state.signedIn);
      return Object.assign({}, state, {
        signedIn: false,
        userName: ""
      });
    default:
      return state;
  }
};

// build redux store
const store = createStore(reducer);
store.dispatch({ type: "INITIALISED" });
store.dispatch({ type: "SIGNIN" });
store.dispatch({ type: "SIGNOUT" });

// render app
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
