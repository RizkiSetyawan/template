import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthContext from "./context/auth/authContext";

// Pages
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";

const DashboardRoutes = () => {
  return (
    <Layout>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route component={Home} exact path="/home" />
        <Route component={NotFound} exact path="/not-found" />
        <Redirect to="/not-found" />
      </Switch>
    </Layout>
  );
};

const Routes = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { token } = authContext;
  return (
    <Switch>
      <Route
        path="/login"
        {...rest}
        render={() => (token ? <Redirect to="/" /> : <Login />)}
      />
      <Route
        path="/"
        render={() => (token ? <DashboardRoutes /> : <Redirect to="/login" />)}
      />
    </Switch>
  );
};

export default Routes;
