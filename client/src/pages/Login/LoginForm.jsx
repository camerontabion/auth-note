import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Joi from 'joi';

const schema = Joi.object({
  email: Joi.string()
    .email({
      tlds: { allow: ['com', 'org', 'net'] },
    })
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
});

const LoginForm = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    try {
      await schema.validateAsync(user);
      setError('');
      setSubmitting(true);
      await login(user);
    } catch (err) {
      setError('Incorrect email or password!');
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="form__title">Login</h2>
      <div className="form__group">
        <label htmlFor="email" className="form__label">
          Email:
          <input
            type="email"
            id="email"
            className="form__input"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="form__group">
        <label htmlFor="password" className="form__label">
          Password:
          <input
            type="password"
            id="password"
            className="form__input"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="form__group">
        <button type="submit" className="form__button" disabled={submitting}>
          {!submitting ? 'Login' : 'Loading...'}
        </button>
      </div>
      <div className="form__group">
        <p className="form__error">{error}</p>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
