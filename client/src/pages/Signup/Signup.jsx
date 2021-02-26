import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SignupForm from './SignupForm';
import useUserContext from '../../hooks/useUserContext';

const Signup = () => {
  const { user, signup } = useUserContext();

  return (
    <div className="signup">
      {user && <Redirect to="/dashboard" />}
      <Helmet>
        <title>Auth Notes | Signup</title>
      </Helmet>
      <SignupForm signup={signup} />
      <div className="signup__login-link">
        <span>Already have an account?</span>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
