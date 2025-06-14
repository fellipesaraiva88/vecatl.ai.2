import React, { useState } from 'react';
import styled from 'styled-components';

const Dialog = styled.div`
  background: #1e1e1e;
  color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  background: #2a2a2a;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px;
  font-size: 1rem;
  resize: none;
  margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button<{ primary?: boolean }>`
  background: ${(props) => (props.primary ? '#888' : '#333')};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.primary ? '#aaa' : '#444')};
  }
`;

export default function IdeaDialog({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (idea: string) => void;
}) {
  const [idea, setIdea] = useState('');

  return (
    <Dialog>
      <h3>New Idea</h3>
      <TextArea
        placeholder="Enter your idea..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />
      <ButtonGroup>
        <Button onClick={onClose}>Cancel</Button>
        <Button primary onClick={() => onAdd(idea)} disabled={!idea.trim()}>
          Add Idea
        </Button>
      </ButtonGroup>
    </Dialog>
  );
}
