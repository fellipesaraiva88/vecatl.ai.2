import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaTrash, FaTasks, FaStickyNote, FaPlus } from 'react-icons/fa';

const IdeasContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const InputBar = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 8px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const AddButton = styled.button`
  background: #000;
  color: #fff;
  border-radius: 6px;
  padding: 10px 14px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IdeaCard = styled.div`
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IdeaText = styled.div`
  flex: 1;
  text-align: left;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  margin-left: 8px;
  cursor: pointer;
  font-size: 16px;
`;

const EmptyState = styled.div`
  margin-top: 60px;
  font-size: 16px;
  color: #888;
`;

const IdeasList = () => {
  const [ideas, setIdeas] = useState<any[]>([]);
  const [newIdea, setNewIdea] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ideas', {
        headers: { 'Cache-Control': 'no-cache' },
      });
      const data = await res.json();
      setIdeas(data);
    } catch (err) {
      console.error('Failed to load ideas', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const handleAdd = async () => {
    if (!newIdea.trim()) return;
    await fetch('/api/ideas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newIdea }),
    });
    setNewIdea('');
    fetchIdeas();
  };

  const handleDelete = async (id: number) => {
    await fetch('/api/ideas', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchIdeas();
  };

  const handleConvertToTask = async (idea: string, id: number) => {
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: idea }),
    });
    await handleDelete(id);
  };

  const handleConvertToNote = async (idea: string, id: number) => {
    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: idea }),
    });
    await handleDelete(id);
  };

  return (
    <IdeasContainer>
      <Title>💡 Your Ideas</Title>

      <InputBar>
        <Input
          placeholder="Type your idea..."
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
        />
        <AddButton onClick={handleAdd}>
          <FaPlus />
        </AddButton>
      </InputBar>

      {loading && <div>Loading...</div>}

      {!loading && ideas.length === 0 && (
        <EmptyState>No ideas yet. Start writing something 💬</EmptyState>
      )}

      {ideas.map((idea) => (
        <IdeaCard key={idea.id}>
          <IdeaText>{idea.content}</IdeaText>
          <div>
            <IconButton onClick={() => handleConvertToTask(idea.content, idea.id)}>
              <FaTasks title="Convert to Task" />
            </IconButton>
            <IconButton onClick={() => handleConvertToNote(idea.content, idea.id)}>
              <FaStickyNote title="Convert to Note" />
            </IconButton>
            <IconButton onClick={() => handleDelete(idea.id)}>
              <FaTrash title="Delete" />
            </IconButton>
          </div>
        </IdeaCard>
      ))}
    </IdeasContainer>
  );
};

export default IdeasList;
