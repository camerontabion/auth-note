import React from 'react';
import { NavLink } from 'react-router-dom';
import useUserContext from '../hooks/useUserContext';

const Header = () => {
  const { user, logout } = useUserContext();

  return (
    <header className="main-header">
      <h1 className="main-header__title">
        <NavLink exact to="/">Auth Notes</NavLink>
      </h1>
      <nav className="main-header__nav">
        {!user ? (
          <>
            <NavLink
              exact
              to="/signup"
              className="main-header__link"
              activeClassName="main-header__link--current"
            >
              Signup
            </NavLink>
            <NavLink
              exact
              to="/login"
              className="main-header__link"
              activeClassName="main-header__link--current"
            >
              Login
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              exact
              to="/dashboard"
              className="main-header__link"
              activeClassName="main-header__link--current"
            >
              Dashboard
            </NavLink>
            <button
              type="button"
              onClick={logout}
              className="main-header__button"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
