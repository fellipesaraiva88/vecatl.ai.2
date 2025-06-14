import React, { useState } from 'react';
import styled from 'styled-components';

const DialogContainer = styled.div`
  background: #1a1a1a;
  color: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 400px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const Input = styled.input`
  background: #333;
  color: white;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  background: #333;
  color: white;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #0056b3;
  }
`;

const CustomDialog = ({ title, onClose, onSubmit }: { title: string; onClose: () => void; onSubmit: (data: any) => void }) => {
  const [inputData, setInputData] = useState('');
  const [textAreaData, setTextAreaData] = useState('');

  const handleSubmit = () => {
    onSubmit({ inputData, textAreaData });
    onClose();
  };

  return (
    <DialogContainer>
      <Title>{title}</Title>
      <Input
        type="text"
        placeholder="Enter text..."
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <TextArea
        placeholder="Enter details..."
        value={textAreaData}
        onChange={(e) => setTextAreaData(e.target.value)}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </DialogContainer>
  );
};

export default CustomDialog;
