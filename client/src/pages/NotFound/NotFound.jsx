import React from 'react';
import { Helmet } from 'react-helmet';

const NotFound = () => (
  <div className="notFound">
    <Helmet>
      <title>Auth Notes | Not Found</title>
    </Helmet>
    <img
      src="https://http.cat/404"
      alt="404 cat"
      className="notFound__img"
    />
  </div>
);

export default NotFound;
