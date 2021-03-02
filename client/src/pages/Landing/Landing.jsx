import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useUserContext from '../../hooks/useUserContext';

const Landing = () => {
  const { user } = useUserContext();

  return (
    <div className="landing">
      <Helmet>
        <title>Auth Notes</title>
      </Helmet>
      <h2 className="landing__title">Learning authentication and some other stuff!!!</h2>
      <p className="landing__subtitle">~ Create an account to write notes ~</p>
      {user ? (
        <Link to="/dashboard" className="landing__link">Dashboard</Link>
      ) : (
        <div className="landing__link-group">
          <Link to="/login" className="landing__link">Login</Link>
          or
          <Link to="/signup" className="landing__link">Signup</Link>
        </div>
      )}
    </div>
  );
};

export default Landing;
