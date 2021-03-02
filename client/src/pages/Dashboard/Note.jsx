import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const Note = ({ note, removeNote, updateNote }) => {
  const [text, setText] = useState(note.text);
  const [error, setError] = useState('');
  const textboxRef = useRef(null);
  const [monthNum, day, year] = new Date(note.updatedAt).toLocaleDateString('en-US').split('/');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateNote(note.id, text);
      setError('');
      textboxRef.current.blur();
    } catch (err) {
      setError('Invalid note!');
    }
  };

  return (
    <div className="note">
      <form className="note__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="note__text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          ref={textboxRef}
          minLength="2"
          maxLength="30"
          required
        />
      </form>
      {error && <p className="form__error">{error}</p>}
      <p className="note__date">{`${months[monthNum - 1]} ${day}, ${year}`}</p>
      <button
        type="button"
        className="note__delete"
        onClick={() => removeNote(note.id)}
      >
        &#10006;
      </button>
    </div>
  );
};

Note.propTypes = {
  note: PropTypes.exact({
    text: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  removeNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
};

export default Note;
