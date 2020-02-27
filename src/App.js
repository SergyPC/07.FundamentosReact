import React, { useEffect, Component} from 'react';
//import logo from './logo.svg';
//import './css/reset.css';
// import './App.css';

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
//import Navbarr from './components/navbar';

//import api from './js/api.js';

function App() {

  return (
    <div className="App">
      {/* <header className="App-header"> */}
        {/* <!-- navbar --> */}
        {/* <nav id="navbar" class="app-navbar"> */}
          {/* <div class="navbar-logo"> */}
            {/* <a href="/" alt="GUAGUA POP">GUAGUA POP</a>
            <br /> */}
            {/* <h1>GUAGUAPOP</h1> */}
          {/* </div> */}
        {/* </nav> */}
        {/* <!-- navbar-end --> */}
        {/* <h1>GuaGuaPop</h1> */}
      {/* </header> */}
      
      <main>
      <section id="detailSection" className="detail-section">
        <Router>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route exact path="/dashboard/:_id" component={Detail} />
            <Route path="/dashboard" component={Dashboard} />
            <Redirect to="/dashboard" />
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
      </section>
      </main>
    </div>
  );
}

export default App;
