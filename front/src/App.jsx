import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import Index from './page';
import Test from './page/test';
import NotFound from './page/404';

// Use HashRouter in electron case.
const Router = window.location.pathname.includes('index.html') ? HashRouter : BrowserRouter;

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/test" component={Test} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
