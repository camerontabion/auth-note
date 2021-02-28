import mongoose from 'mongoose';

const RequiredString = {
  type: String,
  required: true,
};

const transform = (doc, ret) => {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
};

const noteSchema = new mongoose.Schema({
  text: RequiredString,
}, {
  timestamps: true,
});

noteSchema.set('toJSON', { transform });

const userSchema = new mongoose.Schema({
  username: RequiredString,
  email: RequiredString,
  passwordHash: RequiredString,
  notes: [noteSchema],
}, {
  timestamps: true,
});

userSchema.set('toJSON', { transform });

export default mongoose.model('User', userSchema);
