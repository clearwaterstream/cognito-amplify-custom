import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

import { AuthClient } from 'AuthClient';
import Home from 'Home';
import SignIn from 'User/SignIn';
import SignUp from 'User/SignUp';

AuthClient.start();

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  logo: {
    marginBottom: theme.spacing(0.3)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

function Copyright() {
  return <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Lorem Ipsum '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
}

function App(children) {
  const classes = useStyles();
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src="mock_logo.png" className={classes.logo}></img>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Router>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default App;