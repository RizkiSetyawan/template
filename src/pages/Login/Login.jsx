import React, { useState, useContext, useEffect } from "react";

import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SmallLogo from "./small-logo.jpeg";

import Alerts from "../../components/Alerts/Alerts";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Delameta Bilano
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  progress: {
    color: "white"
  },
  image: {
    background: `linear-gradient(left,#2bc1f6,#138ee9)`
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginLeft: "20px",
    marginRight: "20px"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  quote: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  quoteText: {
    color: theme.palette.common.white,
    fontWeight: 300,
    textAlign: 'center'
  }
}));

export default function SignInSide(props) {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { token, login, error } = authContext;
  const {
    openAlert,
    typeAlert,
    messageAlert,
    handleOpenAlert,
    handleCloseAlert
  } = alertContext;

  const [state, setState] = useState({
    username: "",
    password: "",
    loading: false
  });
  const { username, password, loading } = state;

  useEffect(() => {
    if (token) {
      props.history.push("/");
    }

    if (error) {
      if (error === "Network Error") {
        handleOpenAlert("error", "Server sedang offline");
      }
      if (error.message === "Incorrect username or password") {
        handleOpenAlert("error", "Username atau password anda salah");
      }
      setState({ ...state, loading: false });
    }
    //eslint-disable-next-line
  }, [error, token, props.history]);

  useEffect(() => {
    if (token) {
      props.history.push("/");
    }
    //eslint-disable-next-line
  }, []);

  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    setState({ ...state, loading: true });
    login({
      username,
      password
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <div className={classes.quote}>
          <Typography variant="h2" className={classes.quoteText}>
          <b>DSRC</b> onboarding
          </Typography>
          <Typography variant="h5" className={classes.quoteText}>
            by Delameta Bilano 2020
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={SmallLogo} height="50" alt="logo-dana" />
          <Typography component="h1" variant="h4">
            <b>Sign in</b>
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              value={username}
              onChange={onChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              value={password}
              onChange={onChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {loading ? (
                <CircularProgress size={24} className={classes.progress} />
              ) : (
                <div className={classes.content}>LOGIN</div>
              )}
            </Button>
            <Alerts
              open={openAlert}
              handleOpenAlert={handleOpenAlert}
              handleCloseAlert={handleCloseAlert}
              typeAlert={typeAlert}
              messageAlert={messageAlert}
            />
            <Grid container></Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
