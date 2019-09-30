import React, { useState } from 'react';
import {Button, Box, TextField, Link, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import PhoneMask from 'Components/PhoneMask';
import ErrorSnackbar from 'Components/ErrorSnackbar';
import { AuthClient } from 'AuthClient';
import { StringUtil } from 'Util/Helpers';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

function SignUp(props) {
  const classes = useStyles();

  const [inputs, setInputs] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  const LoginLink = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to={{ pathname: 'login', search: window.location.search }} {...props} />
  ));

  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }

  function DoSignUpCb(err) {
    if(!StringUtil.isNullOrEmpty(err)) {
      setErrorMsg(err);
    }
  }

  function DoSignUp(e) {    
    setErrorMsg('');
    
    AuthClient.signUp(inputs, DoSignUpCb);
  }

  function ErrorBlock() {
    if(StringUtil.isNullOrEmpty(errorMsg))
      return null;

      return (
      <Grid item xs={12}>
        <ErrorSnackbar errorMessage={errorMsg} />
      </Grid>);
  }

  return (
    <React.Fragment>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phone"
                label="Phone"
                type="tel"
                id="phone"
                autoComplete="tel-national"
                InputProps={{
                  inputComponent: PhoneMask,
                }}
                onChange={handleInputChange}
              />
            </Grid>
            <ErrorBlock />
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={DoSignUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={LoginLink} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
  );
}

export default SignUp;