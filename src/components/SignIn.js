import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import firebase from "../firebase";

import {
  Typography,
  Paper,
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import withStyles from "@material-ui/core/styles/withStyles";

const SignIn = props => {
  const { classes } = props; // withStyles styling from 'styles' constant available as props in layout

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    // handle attempt to login
    try {
      await firebase.login(email, password);
      props.dispatch({ type: "SIGNIN", payload: { userName: firebase.getCurrentUsername() } });
      props.history.replace("/userspace");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          onSubmit={e => e.preventDefault() && false}
        >
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="off"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="off"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={login}
            className={classes.submit}
          >
            Sign in
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            component={Link}
            to="/register"
            className={classes.register}
          >
            Register
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            component={Link}
            to="/"
            className={classes.return}
          >
            Return to front page
          </Button>
        </form>
      </Paper>
    </div>
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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    marginTop: theme.spacing(3),
    color: "white",
    backgroundColor: theme.palette.primary.main
  },
  register: {
    marginTop: theme.spacing(3),
    color: "white",
    backgroundColor: theme.palette.success.main
  },
  return: {
    marginTop: theme.spacing(3),
    color: "white",
    backgroundColor: theme.palette.text.secondary
  }
});

// Redux store
const mapStateToProps = state => {
  return {
    signedIn: state.signedIn,
    userName: state.userName
  };
};

export default connect(mapStateToProps)(withRouter(withStyles(styles)(SignIn)));
