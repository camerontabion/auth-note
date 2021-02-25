import React from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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
    </div>
  );
};

export default Signup;
