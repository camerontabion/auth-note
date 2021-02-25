import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import dotenv from 'dotenv';
import session from 'express-session';
import connectMongo from 'connect-mongo';

import { notFound, handleError, isLoggedIn } from './utils/middleware.js';
import auth from './controllers/auth.js';
import notes from './controllers/notes.js';

// Initialize .env
dotenv.config({ path: './src/.env' });

// Connect to DB
(async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected!');
  } catch (err) {
    console.error(`Error connecting: ${err}`);
    process.exit(1);
  }
})();

// Create express app
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions
const MongoStore = connectMongo(session);
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 10,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions',
  }),
}));

// Routers
app.use('/api/auth', auth);
app.use('/api/notes', isLoggedIn, notes);

// Error handling
app.use(notFound);
app.use(handleError);

export default app;
