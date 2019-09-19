import React from 'react';
import logo from './logo.svg';
import './App.css';

import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
  Auth: {
      region: 'ca-central-1',
      userPoolWebClientId: '5rkq9dgoofr5lrnp0mqcslg6cl',
      mandatorySignIn: true,
      authenticationFlowType: 'USER_PASSWORD_AUTH'
  }
});

// You can get the current config object
const currentConfig = Auth.configure();

const user = Auth.signIn('igor', '123456');

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
