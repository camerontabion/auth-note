import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Joi from 'joi';

const noteSchema = Joi.object({
  text: Joi.string()
    .min(2)
    .max(30)
    .required(),
});

const NoteForm = ({ addNote }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const note = await noteSchema.validateAsync({ text });
      setText('');
      setError('');
      await addNote(note.text);
    } catch (err) {
      setError('Invalid note!');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__group">
        <label htmlFor="text" className="form__label">
          Add Note:
          <input
            type="text"
            id="text"
            className="form__input"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            minLength="2"
            maxLength="30"
            required
          />
        </label>
        <span className="form__muted">
          Note must be between 2 and 30 characters long.
        </span>
      </div>
      {error && (
        <div className="form__group">
          <p className="form__error">{error}</p>
        </div>
      )}
    </form>
  );
};

NoteForm.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteForm;
