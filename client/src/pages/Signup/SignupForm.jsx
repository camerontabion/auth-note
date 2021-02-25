import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Joi from 'joi';

const schema = Joi.object({
  username: Joi.string()
    .min(2)
    .max(30)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Username can only include alphanumeric characters and "_"',
    }),
  email: Joi.string()
    .email({
      tlds: { allow: ['com', 'org', 'net'] },
    })
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
  confirmPassword: Joi.ref('password'),
});

const SignupForm = ({ signup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, email, password };
    try {
      await schema.validateAsync(user);
      if (password !== confirmPassword) throw new Error('Passwords do not match!');
      setError('');
      setSubmitting(true);
      await signup(user);
    } catch (err) {
      if (err.message.includes('username')) setError('Username is invalid!');
      else if (err.message.includes('email')) setError('Email is invalid!');
      else if (err.message.includes('password')) setError('Password is invalid!');
      else setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="form__title">Signup</h2>
      <div className="form__group">
        <label htmlFor="username" className="form__label">
          Username:
          <input
            type="text"
            id="username"
            className="form__input"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <span className="form__muted">
            Username must only contain alphanumeric characters and must
            be between 2 and 30 characters long.
          </span>
        </label>
      </div>
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
          <span className="form__muted">
            Email must be from the following tlds:
            &quot;com&quot;, &quot;org&quot;, &quot;net&quot;
          </span>
        </label>
      </div>
      <div className="form__group">
        <div className="form__group--2-col">
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
          <label htmlFor="confirmPassword" className="form__label">
            Re-enter Password:
            <input
              type="password"
              id="confirmPassword"
              className="form__input"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <span className="form__muted">
          Password must be a minimum of 8 characters.
        </span>
      </div>
      <div className="form__group">
        <button type="submit" className="form__button" disabled={submitting}>
          {!submitting ? 'Signup' : 'Loading...'}
        </button>
      </div>
      {error && (
        <div className="form__group">
          <p className="form__error">{error}</p>
        </div>
      )}
    </form>
  );
};

SignupForm.propTypes = {
  signup: PropTypes.func.isRequired,
};

export default SignupForm;
