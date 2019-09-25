import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect, withRouter } from "react-router-dom";
import { StringUtil } from 'Util/Helpers';
import ErrorSnackbar from 'Components/ErrorSnackbar';
import { AuthClient } from 'AuthClient';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

function AuthRouter(props) {
  const [sessionStatus, setSessionStatus] = useState('');
  
  const classes = useStyles();

  useEffect(() => {
    async function getSession()
    {
      const status = await AuthClient.getSessionStatus();

      setSessionStatus(status);
    }

    getSession();
  }, []);

  let redirectUri = '';

  if(!StringUtil.isNullOrEmpty(window.location.search)) {
    const params = new URLSearchParams(window.location.search);

    redirectUri = params.get('redirect_uri');
  }

  if(StringUtil.isNullOrEmpty(redirectUri)) {
    const errorMsg = "redirect_uri is not specified";

    return (
      <ErrorSnackbar errorMessage={errorMsg} />
    );
  }

  if(StringUtil.isEqual(sessionStatus, 'sessionExists')) {
    window.location.assign(redirectUri);

    return null;
  }

  if(StringUtil.isEqual(sessionStatus, 'needToSignIn')) {
    return (
      <Redirect to="login" />
    );
  }

  return (
    <CircularProgress className={classes.progress} />
  );
}

export default withRouter(AuthRouter);