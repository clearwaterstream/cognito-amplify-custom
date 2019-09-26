import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { AuthClient } from 'AuthClient';
import ErrorSnackbar from 'Components/ErrorSnackbar';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

function SignIn(props) {
  const classes = useStyles();
  
  const [inputs, setInputs] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }

  async function DoLogin(e) {
    setErrorMsg('');
    
    const username = inputs.username;
    const password = inputs.password;

    const r = await AuthClient.signIn(username, password);

    if(r !== "ok") {
      setErrorMsg(r);

      return;
    }
  }

  const SignUpLink = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to={{ pathname: 'signup', search: window.location.search }} {...props} />
  ));

  const ForgotPasswordLink = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to={{ pathname: 'forgotPassword', search: window.location.search }} {...props} />
  ));

  return (
    <React.Fragment>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <ErrorSnackbar errorMessage={errorMsg} />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={DoLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={ForgotPasswordLink} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={SignUpLink} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
    </React.Fragment>
  );
}

export default SignIn;