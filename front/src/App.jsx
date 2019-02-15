import React from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import Index from './page';
import NotFound from './page/404';

// Use HashRouter in electron case.
const Router = window.location.pathname.includes('index.html')
  ? HashRouter
  : BrowserRouter;
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
