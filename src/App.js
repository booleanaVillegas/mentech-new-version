import React, { Component } from 'react';
import './App.css';

import {BrowserRouter as Router, Route } from "react-router-dom";

import 'antd/dist/antd.css';

import Login from './containers/Login/Login.js';
import SignUp from './containers/SignUp/SignUp.js';
import Main from './containers/Main/Main.js';
import Profile from './containers/Profile/Profile.js';
import Challenge from './containers/Challenge/Challenge.js'; 
import Learned from './containers/Learned/Learned.js';
import NavMenu from './components/NavMenu/NavMenu.js';
import TopBar from './components/TopBar/TopBar.js';
import Moderador from './containers/Moderador/Moderador.js';

class App extends Component {
  render() {
    return (
      <Router>
      <section>     
       <Route path="/" component={NavMenu} />   
        <Route path="/" component={TopBar} /> 
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} /> 
        <Route exact path="/" component={Main} />
        <Route exact path="/juego" component={Challenge} />   
        <Route path="/perfil" component={Profile} />   
        <Route exact path="/lecciones" component={Learned} /> 
        <Route exact path="/moderador" component={Moderador} />   
      </section>
      </Router>
    );
  }
}

export default App;
