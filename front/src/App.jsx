import React from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import Index from './page';
import NotFound from './page/404';
import CssBaseLine from './component/lib/CssBaseLine';

// Use HashRouter in electron case.
const Router = window.location.pathname.includes('index.html')
  ? HashRouter
  : BrowserRouter;
const App = () => {
  return (
    <React.Fragment>
      <CssBaseLine/>
      <Router>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
