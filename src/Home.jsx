import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

function Home({ match, location }) {
  const classes = useStyles();

  const params = new URLSearchParams(location.search);

  const redirectUri = params.get('redirect_uri');

  return (
    <CircularProgress className={classes.progress} />
  );
}

export default Home;