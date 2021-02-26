import express from 'express';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const router = express.Router();

const schema = {
  username: Joi.string()
    .min(2)
    .max(30)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Username can only include alphanumeric characters and "_"',
    }),
  email: Joi.string()
    .email()
    .lowercase()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
};

const signupSchema = Joi.object(schema);
const loginSchema = Joi.object({ email: schema.email, password: schema.password });

router.post('/signup', async (req, res, next) => {
  try {
    const { username, email, password } = await signupSchema.validateAsync(req.body);

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser?.username === username) {
      res.status(409);
      throw new Error('Username already exists!');
    }
    if (existingUser?.email === email) {
      res.status(409);
      throw new Error('Email already exists!');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({ username, email, passwordHash });
    const savedUser = await user.save();
    req.session.email = savedUser.email;
    res.json({
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
      joined: savedUser.createdAt,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = await loginSchema.validateAsync(req.body);

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(401);
      throw new Error('Invalid email or password!');
    }

    const validPassword = await bcrypt.compare(password, existingUser.passwordHash);
    if (!validPassword) {
      res.status(401);
      throw new Error('Invalid email or password!');
    }

    req.session.email = existingUser.email;
    res.json({
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
      joined: existingUser.createdAt,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  if (req.session.email) {
    const existingUser = await User.findOne({ email: req.session.email });
    res.json({
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
      joined: existingUser.createdAt,
    });
  } else {
    next(new Error('Not logged in'));
  }
});

router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(new Error(err));
    res.clearCookie('connect.sid').json({ message: 'Successfully logged out' });
  });
});

export default router;
