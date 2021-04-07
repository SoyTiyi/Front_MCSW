import React, { useState, useEffect }from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from "./../services/AuthService.js";


export default function PrivateRoute(props) {

  const [validUser, setValidUser] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    
    const fetchData = async () => {
      const result = await authService.isAuthenticated(props.roles);
      setValidUser(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={() =>
        validUser ? (
          <Component {...props} />
        ) : loading ? (
          console.log("loading...")
        ) : (
          <Redirect
            to={{
              pathname: "/",

            }}
            />
        )
      }
      />
  );
};
