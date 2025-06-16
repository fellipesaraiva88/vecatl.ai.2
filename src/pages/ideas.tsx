import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaTrash, FaTasks, FaStickyNote, FaPlus } from 'react-icons/fa';
import { TRANSLATIONS } from '../constants/translations';

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #121212;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const IdeasContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  background-color: #1e1e1e;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
`;

const InputRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  font-size: 1rem;
  background-color: #2a2a2a;
  border: 1px solid #444;
  border-radius: 8px;
  color: white;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const AddButton = styled.button`
  background: #0066ff;
  color: white;
  padding: 0 16px;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #0050cc;
  }
`;

const IdeaCard = styled.div`
  background-color: #2a2a2a;
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IdeaText = styled.div`
  color: white;
  flex: 1;
  font-size: 16px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #ccc;
  margin-left: 10px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

const EmptyText = styled.div`
  margin-top: 3rem;
  text-align: center;
  color: #777;
`;

const Ideas = () => {
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
      console.error('Falha ao carregar ideias', err);
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
    <PageWrapper>
      <IdeasContainer>
        <Title>{TRANSLATIONS.ideas.titlePage}</Title>
        <InputRow>
          <Input
            placeholder={TRANSLATIONS.ideas.placeholder}
            value={newIdea}
            onChange={(e) => setNewIdea(e.target.value)}
          />
          <AddButton onClick={handleAdd} title={TRANSLATIONS.ideas.addButton}>
            <FaPlus />
          </AddButton>
        </InputRow>

        {loading && <EmptyText>{TRANSLATIONS.ideas.loading}</EmptyText>}

        {!loading && ideas.length === 0 && (
          <EmptyText>{TRANSLATIONS.ideas.empty}</EmptyText>
        )}

        {ideas.map((idea) => (
          <IdeaCard key={idea.id}>
            <IdeaText>{idea.content}</IdeaText>
            <div>
              <IconButton onClick={() => handleConvertToTask(idea.content, idea.id)} title={TRANSLATIONS.ideas.convertToTask}>
                <FaTasks />
              </IconButton>
              <IconButton onClick={() => handleConvertToNote(idea.content, idea.id)} title={TRANSLATIONS.ideas.convertToNote}>
                <FaStickyNote />
              </IconButton>
              <IconButton onClick={() => handleDelete(idea.id)} title={TRANSLATIONS.ideas.delete}>
                <FaTrash />
              </IconButton>
            </div>
          </IdeaCard>
        ))}
      </IdeasContainer>
    </PageWrapper>
  );
};

export default Ideas;
