import React from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LoginForm from './LoginForm';
import useUserContext from '../../hooks/useUserContext';

const Login = () => {
  const { user, login } = useUserContext();

  return (
    <div className="login">
      {user && <Redirect to="/dashboard" />}
      <Helmet>
        <title>Auth Notes | Login</title>
      </Helmet>
      <LoginForm login={login} />
    </div>
  );
};

export default Login;
