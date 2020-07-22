import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';

import SumoNavbar from "./components/navbar.component";
import SumoList from "./components/division.component";
import SumoProfile from "./components/profile.component";

function App() {
  return (
    <Router>
      <SumoNavbar />
      <br />
      <Route path="/" exact component={SumoList} />
      <Route path="/Profile/:id" component={SumoProfile} />
    </Router>
    
  );
}

export default App;
