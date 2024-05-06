import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router} from 'react-router-dom';
import { Switch, Route } from "react-router-dom";
import Home from './Home';
import Photographer from './Photographer';
import PhInTheArea from './PhInTheArea';
import { PhotographersProvider } from './Context';
import Navigation from './Navigation';
import DetailsPhotoshoot from './DetailsPhotoshoot';
import MyBookings from './MyBookings';
function App() {
  return (
    <PhotographersProvider>
    <Router>
    <Navigation/>
      <div>
        <Switch>
          <Route exact path="/">{<Home/>}</Route>
        </Switch>
        <Switch>
          <Route exact path="/photographers/:id">{<Photographer/>}</Route>
        </Switch>
        <Switch>
          <Route exact path="/photographers">{<PhInTheArea/>}</Route>
        </Switch>
        <Switch>
          <Route exact path="/photoshoots/:id">{<DetailsPhotoshoot/>}</Route>
        </Switch>
        <Switch>
          <Route exact path="/photographers/zip/:zip">{<PhInTheArea/>}</Route>
        </Switch>
        <Switch>
          <Route exact path="/mybookings">{<MyBookings/>}</Route>
        </Switch>
      </div>      
    </Router>
    </PhotographersProvider>      
    // <h1>Project Client</h1>
  );
}

export default App;
