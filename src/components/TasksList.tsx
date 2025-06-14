import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TaskDialog from './TaskDialog';
import './DialogStyles.module.css';

const TasksContainer = styled.div``;
const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 24px;
  font-weight: 600;
`;
const TaskCard = styled.div`
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
  padding: 18px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TaskLabel = styled.label`
  display: flex;
  align-items: center;
  font-weight: 500;
`;
const TaskCheckbox = styled.input`
  margin-right: 12px;
  accent-color: var(--primary);
`;
const AddTaskForm = styled.form`
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

const TasksList = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newTask, setNewTask] = useState('');
  const [showTaskDialog, setShowTaskDialog] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data);
    } catch {
      setError('Failed to load tasks.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTask }),
      });
      setNewTask('');
      fetchTasks();
    } catch {
      setError('Failed to add task.');
    }
  };

  const handleToggle = async (id: number, completed: boolean) => {
    try {
      await fetch('/api/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, completed }),
      });
      fetchTasks();
    } catch {
      setError('Failed to update task.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch('/api/tasks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchTasks();
    } catch {
      setError('Failed to delete task.');
    }
  };

  const handleAddTaskClick = () => {
    setShowTaskDialog(true);
  };

  return (
    <TasksContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title>📝 Tasks</Title>
        <AddButton onClick={handleAddTaskClick}>Add Task</AddButton>
      </div>
      {showTaskDialog && (
        <TaskDialog
          onClose={() => setShowTaskDialog(false)}
          onCreate={(task) => console.log('Task created:', task)}
        />
      )}
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && tasks.length === 0 && (
        <div style={{ color: '#888' }}>No tasks yet.</div>
      )}
      <div>
        <h3>Overdue Tasks</h3>
        {tasks.filter(task => task.dueDate < new Date().toISOString()).map(task => (
          <TaskCard key={task.id}>
            {task.title}
            <div>
              <DeleteButton onClick={() => handleDelete(task.id)}>Delete</DeleteButton>
            </div>
          </TaskCard>
        ))}
      </div>
      <div>
        <h3>Completed Tasks</h3>
        {tasks.filter(task => task.completed).map(task => (
          <TaskCard key={task.id}>
            {task.title}
            <div>
              <DeleteButton onClick={() => handleDelete(task.id)}>Delete</DeleteButton>
            </div>
          </TaskCard>
        ))}
      </div>
    </TasksContainer>
  );
};

export default TasksList;
