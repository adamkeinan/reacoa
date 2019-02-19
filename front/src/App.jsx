import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Index from './page';
import NotFound from './page/404';
import CssBaseLine from './component/lib/CssBaseLine';
import storeRoot from './store';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);
storeRoot.setRouting(routingStore);

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
