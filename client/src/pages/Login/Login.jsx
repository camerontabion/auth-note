import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
      <div className="login__signup-link">
        <span>Need an account?</span>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
};

export default Login;
