import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import { Route, Switch } from 'react-router-dom' // BrowserRouter as Router
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from "./context/AuthContext";
// Import Pages
import Dashboard from './views/Dashboard'
import Homepage from './views/HomePage'
import LoginPage from './views/LoginPage'
import RegisterPage from './views/RegisterPage'
import Navbar from './views/Navbar'
import Settings from "./views/Settings";
import HelpDesk from "./views/HelpDesk";
import NotFound from "./views/NotFound";


const history = createBrowserHistory()

function App() {
  return (
    <AuthProvider>
    <Router history={history}>
        <Navbar/>
        <Switch>
          <PrivateRoute path="/dashboard"><Dashboard /></PrivateRoute>
          <PrivateRoute path="/settings"><Settings /></PrivateRoute>
          <Route component={LoginPage} path='/login' />
          <Route component={RegisterPage} path='/register' />
          <Route component={Homepage} path='/home' />
          <Route component={HelpDesk} path='/help' />
          <Route component={NotFound} />
        </Switch>
    </Router>
    </AuthProvider>
  );
}

export default App;
