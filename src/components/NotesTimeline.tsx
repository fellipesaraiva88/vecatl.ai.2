import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TRANSLATIONS } from '../constants/translations';

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background: var(--background);
  border-radius: 16px;
  box-shadow: var(--shadow);
`;
const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 24px;
  font-weight: 600;
`;
const NoteCard = styled.div`
  background: var(--card-bg);
  padding: 16px;
  border: 1px solid var(--card-border);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
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
      setError(TRANSLATIONS.notes.error);
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
      setError(TRANSLATIONS.notes.addError);
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
      setError(TRANSLATIONS.notes.deleteError);
    }
  };

  return (
    <TimelineContainer>
      <Title>{TRANSLATIONS.notes.title}</Title>
      <AddNoteForm onSubmit={handleAdd}>
        <AddInput
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
          placeholder={TRANSLATIONS.notes.placeholder}
        />
        <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <input type="checkbox" checked={important} onChange={e => setImportant(e.target.checked)} /> {TRANSLATIONS.notes.important}
        </label>
        <AddButton type="submit">{TRANSLATIONS.notes.add}</AddButton>
      </AddNoteForm>
      {loading && <div>{TRANSLATIONS.notes.loading}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && notes.length === 0 && <div style={{ color: '#888' }}>{TRANSLATIONS.notes.empty}</div>}
      {Object.entries(groupedNotes).map(([date, notes]) => (
        <GroupedNotes key={date}>
          <GroupTitle>{format(new Date(date), 'dd \'de\' MMMM \'de\' yyyy', { locale: ptBR })}</GroupTitle>
          {notes.map(note => (
            <NoteCard key={note.id}>
              <Badge style={{ background: note.isImportant ? 'red' : 'var(--primary)' }} />
              <div>
                <NoteText>{note.title}</NoteText>
                <NoteDate>{format(new Date(note.createdAt), 'hh:mm a')}</NoteDate>
              </div>
              <DeleteButton onClick={() => handleDelete(note.id)}>{TRANSLATIONS.notes.delete}</DeleteButton>
            </NoteCard>
          ))}
        </GroupedNotes>
      ))}
    </TimelineContainer>
  );
};

export default NotesTimeline;
