import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest} render={({ location }) => user ? (children) : (<Redirect to={{pathname: '/login',state: { from: location },}}/>)}/>
  );
};

export default PrivateRoute;