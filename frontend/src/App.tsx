import "reflect-metadata";
import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import LoginComponent from "./components/login.component";
import HomepageComponent from "./components/homepage.component";
import {container} from "tsyringe";
import {UserService} from "./services/UserService";

function App() {
return (
      <Router>
          <Route path='/login' component={LoginComponent}/>
          <Route path='/home' component={HomepageComponent}/>
      </Router>

  );
}

export default App;
