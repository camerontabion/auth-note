import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import auth from '../services/auth';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticating, setAuthenticating] = useState(true);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const retUser = await auth.authenticate();
      if (!retUser.error) setUser(retUser);
      setAuthenticating(false);
    })();
  }, []);

  const signup = async (userData) => {
    const retUser = await auth.signup(userData);
    if (retUser.error) throw new Error(retUser.error);

    setUser({ ...retUser, joined: new Date(retUser.joined) });
    history.push('/dashboard');
  };

  const login = async (userData) => {
    const retUser = await auth.login(userData);
    if (retUser.error) throw new Error(retUser.error);

    setUser({ ...retUser, joined: new Date(retUser.joined) });
    history.push('/dashboard');
  };

  const logout = async () => {
    const res = await auth.logout();
    if (res.error) throw new Error();

    setUser(null);
  };

  return (
    <>
      {!authenticating && (
        <UserContext.Provider
          value={{
            user,
            signup,
            login,
            logout,
          }}
        >
          {children}
        </UserContext.Provider>
      )}
    </>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
