import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const TimelineContainer = styled.div``;
const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 24px;
  font-weight: 600;
`;
const NoteCard = styled.div`
  display: flex;
  align-items: center;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
  padding: 20px;
  margin-bottom: 16px;
`;
const Badge = styled.div`
  width: 10px;
  height: 10px;
  background: var(--primary);
  border-radius: 50%;
  margin-right: 14px;
`;
const NoteText = styled.div`
  font-size: 1.08em;
  font-weight: 500;
`;
const NoteDate = styled.div`
  font-size: 0.85em;
  color: #888;
  margin-top: 2px;
`;
const AddNoteForm = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;
const AddInput = styled.input`
  flex: 1;
`;
const AddButton = styled.button`
  background: var(--primary);
  color: #fff;
  border-radius: 8px;
  padding: 8px 18px;
  font-weight: 500;
  font-size: 15px;
`;
const DeleteButton = styled.button`
  background: #e74c3c;
  color: #fff;
  border-radius: 8px;
  padding: 4px 10px;
  font-size: 13px;
  margin-left: 16px;
`;
const GroupedNotes = styled.div`
  margin-bottom: 32px;
`;
const GroupTitle = styled.h3`
  font-size: 1.2em;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--primary);
`;

const NotesTimeline = () => {
  type Note = {
    id: number;
    title?: string;
    text?: string;
    createdAt: string;
    isImportant?: boolean;
  };

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newNote, setNewNote] = useState('');
  const [important, setImportant] = useState(false);
  const [groupedNotes, setGroupedNotes] = useState<Record<string, Note[]>>({});

  const fetchNotes = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/notes');
      const data = await res.json();
      setNotes(data);
    } catch {
      setError('Failed to load notes.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const grouped = notes.reduce((acc: Record<string, Note[]>, note) => {
      const date = format(new Date(note.createdAt), 'yyyy-MM-dd');
      if (!acc[date]) acc[date] = [];
      acc[date].push(note);
      return acc;
    }, {} as Record<string, Note[]>);
    setGroupedNotes(grouped);
  }, [notes]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    try {
      await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newNote, important }),
      });
      setNewNote('');
      setImportant(false);
      fetchNotes();
    } catch {
      setError('Failed to add note.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch('/api/notes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchNotes();
    } catch {
      setError('Failed to delete note.');
    }
  };

  return (
    <TimelineContainer>
      <Title>📝 Notes</Title>
      <AddNoteForm onSubmit={handleAdd}>
        <AddInput
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
          placeholder="Add a note..."
        />
        <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <input type="checkbox" checked={important} onChange={e => setImportant(e.target.checked)} /> Important
        </label>
        <AddButton type="submit">Add</AddButton>
      </AddNoteForm>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && notes.length === 0 && <div style={{ color: '#888' }}>No notes yet.</div>}
      {Object.entries(groupedNotes).map(([date, notes]) => (
        <GroupedNotes key={date}>
          <GroupTitle>{format(new Date(date), 'MMMM dd, yyyy')}</GroupTitle>
          {notes.map(note => (
            <NoteCard key={note.id}>
              <Badge style={{ background: note.isImportant ? 'red' : 'var(--primary)' }} />
              <div>
                <NoteText>{note.title}</NoteText>
                <NoteDate>{format(new Date(note.createdAt), 'hh:mm a')}</NoteDate>
              </div>
              <DeleteButton onClick={() => handleDelete(note.id)}>Delete</DeleteButton>
            </NoteCard>
          ))}
        </GroupedNotes>
      ))}
    </TimelineContainer>
  );
};

export default NotesTimeline;
