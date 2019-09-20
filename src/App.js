import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import Amplify, { Auth } from 'aws-amplify';
import Login from './login/Login.jsx';

Amplify.configure({
  Auth: {
      region: 'ca-central-1',
      userPoolId: 'ca-central-1_Q3l8p8EpA',
      userPoolWebClientId: '5rkq9dgoofr5lrnp0mqcslg6cl',
      mandatorySignIn: true,
      authenticationFlowType: 'USER_SRP_AUTH'
  }
});

// You can get the current config object
const currentConfig = Auth.configure();

function App() {  
  // Similar to componentDidMount and componentDidUpdate:
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
  
  return (
    <div>
      <Login />
    </div>
  );
}

export default App;