export const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// eslint-disable-next-line no-unused-vars
export const handleError = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({ error: error.message });
};

export const isLoggedIn = (req, res, next) => {
  if (req.session.email) {
    next();
  } else {
    res.status(401);
    next(new Error('Unauthorized!'));
  }
};

export default { notFound, handleError, isLoggedIn };
