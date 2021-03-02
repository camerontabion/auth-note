import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import notesService from '../../services/notes';
import NoteForm from './NoteForm';
import NoteList from './NoteList';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    (async () => {
      const initialNotes = await notesService.getAll();
      setNotes(initialNotes);
    })();
  }, []);

  const addNote = async (text) => {
    const newNotes = await notesService.create(text);
    setNotes(newNotes);
  };

  const removeNote = async (id) => {
    const newNotes = await notesService.remove(id);
    setNotes(newNotes);
  };

  const updateNote = async (id, text) => {
    const newNotes = await notesService.update(id, text);
    setNotes(newNotes);
  };

  return (
    <div className="dashboard">
      <Helmet>
        <title>Auth Notes | Dashboard</title>
      </Helmet>
      <NoteForm addNote={addNote} />
      <NoteList notes={notes} removeNote={removeNote} updateNote={updateNote} />
    </div>
  );
};

export default Dashboard;
