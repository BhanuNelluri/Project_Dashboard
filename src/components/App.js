import React, { useState,PureComponent } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./Home";

class App extends PureComponent {
  
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
