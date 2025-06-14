import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const IdeasContainer = styled.div``;
const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 24px;
  font-weight: 600;
`;
const IdeaCard = styled.div`
  background: var(--card-bg);
  padding: 20px;
  border: 1px solid var(--card-border);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
  margin-bottom: 16px;
  position: relative;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const AddIdeaForm = styled.form`
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
const ConvertButton = styled.button`
  background: var(--primary);
  color: #fff;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 13px;
  margin-left: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
`;

const IdeasList = () => {
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newIdea, setNewIdea] = useState('');

  const fetchIdeas = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/ideas');
      const data = await res.json();
      setIdeas(data);
    } catch {
      setError('Failed to load ideas.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdea.trim()) return;
    try {
      await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newIdea }),
      });
      setNewIdea('');
      fetchIdeas();
    } catch {
      setError('Failed to add idea.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch('/api/ideas', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchIdeas();
    } catch {
      setError('Failed to delete idea.');
    }
  };

  const handleConvert = async (content: string, id: number) => {
    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: content }),
      });
      await handleDelete(id);
    } catch {
      setError('Failed to convert idea.');
    }
  };

  return (
    <IdeasContainer>
      <Title>💡 Ideas</Title>
      <AddIdeaForm onSubmit={handleAdd}>
        <AddInput
          value={newIdea}
          onChange={e => setNewIdea(e.target.value)}
          placeholder="Add an idea..."
        />
        <AddButton type="submit">Add</AddButton>
      </AddIdeaForm>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && ideas.length === 0 && (
        <div style={{ color: '#888' }}>No ideas yet.</div>
      )}
      {ideas.map(idea => (
        <IdeaCard key={idea.id}>
          {idea.content}
          <div>
            <ConvertButton
              onClick={() => handleConvert(idea.content, idea.id)}
            >
              Convert to Project
            </ConvertButton>
            <DeleteButton onClick={() => handleDelete(idea.id)}>Delete</DeleteButton>
          </div>
        </IdeaCard>
      ))}
    </IdeasContainer>
  );
};

export default IdeasList;
