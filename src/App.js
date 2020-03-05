import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline, CircularProgress } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import firebase from "./firebase";

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import UserSpace from "./components/UserSpace";

const theme = createMuiTheme();

const App = props => {
  // update firebase initialisation status in redux store
  useEffect(() => {
    firebase.isInitialized().then(() => {
      props.dispatch({ type: "INITIALISED" });
    });
  });
  if (props.firebaseInitialised !== false) {  // firebase is initialised
    return ( 
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/userspace" component={UserSpace} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    )
  } else {  // waiting for firebase initialisation to complete
    return (      
      <div style={{ ...loaderStyle }}>
        <CircularProgress />
      </div>
    );
  } 
}

// styling
const loaderStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

// Redux store
const mapStateToProps = state => {
  return {
    firebaseInitialised: state.firebaseInitialised,
    signedIn: state.signedIn,
    userName: state.userName
  };
};

export default connect(mapStateToProps)(App);



