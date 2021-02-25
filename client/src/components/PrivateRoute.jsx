import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import useUserContext from '../hooks/useUserContext';

const PrivateRoute = ({ path, exact, children }) => {
  const { user } = useUserContext();

  return (
    <>
      {user ? (
        <Route path={path} exact={exact}>
          {children}
        </Route>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

PrivateRoute.defaultProps = {
  exact: false,
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PrivateRoute;
