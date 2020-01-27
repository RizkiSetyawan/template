import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { MuiThemeProvider } from "@material-ui/core/styles";

import AlertState from "./context/alert/AlertState";
import AuthState from "./context/auth/AuthState";

import Routes from "./Routes";
import theme from "./theme/theme";

const browserHistory = createBrowserHistory();
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AuthState>
        <AlertState>
        <Router history={browserHistory}>
          <Routes />
        </Router>
        </AlertState>
      </AuthState>
    </MuiThemeProvider>
  );
}

export default App;
