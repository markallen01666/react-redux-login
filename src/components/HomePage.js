import React from "react";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";


const HomePage = props => {
  return (
    <div style={{ ...pageStyle, ...props.style }}>
      <Typography component="h1" variant="h5">
        Welcome guest user!
      </Typography>
    </div>
  );
};

const pageStyle = {};

// Redux store
const mapStateToProps = state => {
  return {
    signedIn: state.signedIn,
    userName: state.userName
  };
};

export default connect(mapStateToProps)(HomePage);
