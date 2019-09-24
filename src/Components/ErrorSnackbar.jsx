import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ErrorIcon from '@material-ui/icons/Error';
import { StringUtil } from 'Util/Helpers';

const useStyles = makeStyles(theme => ({
    errorMsg: {
      display: 'flex',
      alignItems: 'center',
    },
    errorIcon: {
      marginRight: theme.spacing(0.5)
    }
}));

function ErrorSnackbar(props) {
    const classes = useStyles();
    
    const errorMessage = props.errorMessage;
    
    if(StringUtil.isNullOrEmpty(errorMessage))
      return null;
  
    return <Box bgcolor="error.main" color="error.contrastText" p={1} borderRadius={3}>
      <span className={classes.errorMsg}><ErrorIcon className={classes.errorIcon} />{errorMessage}</span>
    </Box>
}

export default ErrorSnackbar;