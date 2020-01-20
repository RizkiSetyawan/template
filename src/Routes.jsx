import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import NotFound from './pages/NotFound/NotFound'

const Routes = () => {
  return (
    <div>
      <Switch>
        <Redirect
          exact
          from="/"
          to="/home"
        />
        <Route
          component={Home}
          exact
          path="/home"
        />
        <Route
          component={Login}
          exact
          path="/login"
        />
        <Route
          component={NotFound}
          exact
          path="/not-found"
        />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  )
}

export default Routes
