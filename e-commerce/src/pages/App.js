import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogIn from './pages/LogIn';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;