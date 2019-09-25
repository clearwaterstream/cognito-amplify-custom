import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Hub } from 'aws-amplify';
import Channels from 'Model/Events/Channels';
import AuthInitEvent from 'Model/Events/AuthInitEvent';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

function Home({ match, location }) {
  const classes = useStyles();

  const params = new URLSearchParams(location.search);

  const eventData = new AuthInitEvent();
  eventData.redirectUri = params.get('redirect_uri');

  Hub.dispatch(Channels.customAuth, // auth channel is reserved
  { 
        event: AuthInitEvent.eventName, 
        data: eventData, 
        message: '' 
  });

  return (
    <CircularProgress className={classes.progress} />
  );
}

export default Home;