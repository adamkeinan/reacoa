import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
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
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={require('./page/index').default} />
          <Route component={require('./page/404').default} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
