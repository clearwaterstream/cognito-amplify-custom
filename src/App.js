import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import Amplify, { Auth } from 'aws-amplify';
import SignIn from 'login/SignIn.jsx';

Amplify.configure({
  Auth: {
      region: 'ca-central-1',
      userPoolId: process.env.REACT_APP_COGNITO_userPoolId,
      userPoolWebClientId: process.env.REACT_APP_COGNITO_userPoolWebClientId,
      mandatorySignIn: true,
      authenticationFlowType: 'USER_SRP_AUTH'
  }
});

// You can get the current config object
const currentConfig = Auth.configure();

function App() {  
  // Similar to componentDidMount and componentDidUpdate:
  /*
  useEffect(() => {
    async function login() {
      try
      {
        const user = await Auth.signIn('igor', '1234567');
      }
      catch(ex)
      {
        const l = ex;
      }
    }

    login();
  });
  */
  
  return (
    <div>
      <SignIn />
    </div>
  );
}

export default App;