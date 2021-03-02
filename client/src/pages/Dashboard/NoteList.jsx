import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';

const NoteList = ({ notes, removeNote, updateNote }) => (
  <div className="notes">
    {notes.map((note) => (
      <Note key={note.id} note={note} removeNote={removeNote} updateNote={updateNote} />
    ))}
  </div>
);

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.exact({
    text: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    id: PropTypes.string,
  })).isRequired,
  removeNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
};

export default NoteList;
