import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Redirect } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import { Route, browserHistory } from 'react-router';
// import history from './history'
import { Provider } from 'react-redux';
import Proptypes from 'prop-types';
import Main from './root';
import moment from 'moment';
import momentLocaliser from 'react-widgets-moment';
// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Main styles for this application
import '../scss/style.scss';
import '../assets/style/app.sass';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-table/react-table.css'
import 'react-widgets/dist/css/react-widgets.css'
// scenes
import Home from './components/Home';

import configureStore from './store';
import { PersistGate } from 'redux-persist/integration/react'

momentLocaliser(moment)

const store = configureStore();

ReactDOM.render((
  <Provider store={store} history={browserHistory}>
  <Main/>
    {/* <HashRouter>
      <Switch>
        <Route exact path="/" name="Home" component={Home} />
        <Route exact path="/issue/:type" name="IssueTypeList" component={IssueTypeList} />
        <Route exact path="/shared" name="SharedFiles" component={SharedFiles} />
        <Route exact path="/company/:name" name="CompanyFiles" component={CompanyFiles} />
        <Route exact path="/company/:name/:id" name="CompanyFiles" component={CompanyFiles} />
        <Route exact path="/shared/:id" name="SharedFolderFiles" component={SharedFiles} />
      </Switch>
    </HashRouter> */}
  </Provider>
), document.getElementById('root'));