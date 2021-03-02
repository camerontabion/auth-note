import express from 'express';
import Joi from 'joi';
import User from '../models/user.js';

const router = express.Router();

const noteSchema = Joi.object({
  text: Joi.string()
    .min(2)
    .max(30)
    .required(),
});

router.get('/', async (req, res) => {
  const user = await User.findOne({ email: req.session.email });
  res.json(user.notes);
});

router.post('/', async (req, res, next) => {
  try {
    const note = await noteSchema.validateAsync(req.body);

    const user = await User.findOneAndUpdate(
      { email: req.session.email },
      {
        $push: {
          notes: {
            $each: [note],
            $sort: { updatedAt: -1 },
          },
        },
      },
      { new: true },
    );

    res.json(user.notes);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.session.email, 'notes._id': req.params.id },
      { $set: { 'notes.$.text': req.body.text } },
      { new: true },
    );
    res.json(user.notes);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.session.email },
      { $pull: { notes: { _id: req.params.id } } },
      { new: true },
    );
    res.json(user.notes);
  } catch (err) {
    next(err);
  }
});

export default router;
