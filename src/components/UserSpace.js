import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "../firebase";

import { Typography, Paper, Avatar, Button } from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

// Dummy data
const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Jun",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Jul",
    uv: 2420,
    pv: 7000,
    amt: 2560
  },
  {
    name: "Aug",
    uv: 2530,
    pv: 6500,
    amt: 2800
  },
  {
    name: "Sep",
    uv: 1807,
    pv: 3100,
    amt: 2001
  },
  {
    name: "Oct",
    uv: 2000,
    pv: 6700,
    amt: 1900
  },
  {
    name: "Nov",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Dec",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const UserSpace = props => {
  const { classes } = props; // withStyles styling from 'styles' constant available as props in layout

  if (!firebase.getCurrentUsername()) {
    // not logged in
    alert("Please sign-in first");
    props.history.replace("/signin"); // redirect to SignIn
    return null;
  }

  async function logout() {
    // logout from account
    props.dispatch({ type: "SIGNOUT" });
    await firebase.logout();
    props.history.push("/"); // redirect to HomePage
  }

  return (
    <div className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUserOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" gutterBottom>
          Hello {props.userName}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          This is your dashboard
        </Typography>
        <LineChart
          width={300}
          height={200}
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
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
    [theme.breakpoints.up(1000 + theme.spacing(3) * 2)]: {
      width: 1000,
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
    backgroundColor: theme.palette.primary.main
  },
  submit: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.text.secondary,
    [theme.breakpoints.up(420 + theme.spacing(3) * 2)]: {
      width: 380,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
});

// Redux store
const mapStateToProps = state => {
  return {
    signedIn: state.signedIn,
    userName: state.userName
  };
};

export default connect(mapStateToProps)(
  withRouter(withStyles(styles)(UserSpace))
);
