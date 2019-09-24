import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Hub } from 'aws-amplify';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

function Home({ match, location }) {
  const classes = useStyles();

  const params = new URLSearchParams(location.search);

  const redirectUri = params.get('redirect_uri');

  Hub.dispatch('CustomAuth', // auth channel is reserved
  { 
        event: 'init', 
        data: { redirectUri: redirectUri}, 
        message:'' 
  });

  return (
    <CircularProgress className={classes.progress} />
  );
}

export default Home;