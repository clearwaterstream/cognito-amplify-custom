import React, { useState, useEffect} from 'react';
import './App.css';

import Amplify, { Auth } from 'aws-amplify';
import SignIn from 'Login/SignIn.jsx';

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
  return (
    <div>
      <SignIn />
    </div>
  );
}

export default App;