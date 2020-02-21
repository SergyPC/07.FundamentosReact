import React, { useEffect, Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";

import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import Detail from './components/detail';

//import api from './js/api.js';

function App() {

  return (
    <div className="App">
      <header className="App-header">

        <Router>
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/detail/:advertId" component={Detail} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Redirect to="/login" />
          </Switch>
        </Router>

        {/* <img src={logo} className="App-logo" alt="logo" />
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
        </a> */}
      </header>

    </div>
  );
}

export default App;
