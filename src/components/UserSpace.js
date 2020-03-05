import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "../firebase";

import { Typography, Paper, Avatar, Button } from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";

const UserSpace = props => {
  const { classes } = props;

  if (!firebase.getCurrentUsername()) {
    // not logged in
    alert("Please sign-in first");
    props.history.replace("/signin");
    return null;
  }

  async function logout() {
    await firebase.logout();
    props.history.push("/");
  }

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUserOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" gutterBottom>
          Hello {firebase.getCurrentUsername()}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          This is the dashboard
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          onClick={logout}
          className={classes.submit}
        >
          Logout
        </Button>
      </Paper>
    </main>
  );
};

// Styling
const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // fixes IE11 problem
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    marginTop: theme.spacing(3)
  }
});

// Redux store
const mapStateToProps = state => {
  return {
    signedIn: state.signedIn,
    userName: state.userName
  };
};

export default connect(mapStateToProps)(withRouter(withStyles(styles)(UserSpace)));