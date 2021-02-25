import React from 'react';
import { Helmet } from 'react-helmet';
import useUserContext from '../../hooks/useUserContext';

const Dashboard = () => {
  const { user, logout } = useUserContext();

  return (
    <div className="dashboard">
      <Helmet>
        <title>Auth Notes | Dashboard</title>
      </Helmet>
      <h2 className="dashboard__title">{`Hello ${user.username}!`}</h2>
      <p className="dashboard__subtitle">Fancy meeting you here 😜💖💋👏🌹</p>
      <button type="button" className="dashboard__logout" onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
