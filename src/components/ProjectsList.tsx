import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CreateTaskModal from './CreateTaskModal';

const ProjectsContainer = styled.div``;
const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 24px;
  font-weight: 600;
`;
const ProjectCard = styled.div`
  background: var(--card-bg);
  padding: 20px;
  border: 1px solid var(--card-border);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
  margin-bottom: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const AddProjectForm = styled.form`
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
const NewTaskButton = styled.button`
  background: var(--primary);
  color: #fff;
  border-radius: 8px;
  padding: 8px 18px;
  font-weight: 500;
  font-size: 15px;
  margin-top: 16px;
`;

const ProjectsList = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newProject, setNewProject] = useState('');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showCreateTask, setShowCreateTask] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch {
      setError('Failed to load projects.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.trim()) return;
    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newProject }),
      });
      setNewProject('');
      fetchProjects();
    } catch {
      setError('Failed to add project.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch('/api/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchProjects();
    } catch {
      setError('Failed to delete project.');
    }
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
  };

  const handleCreateTask = async (taskData: any) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...taskData,
          projectId: selectedProject?.id,
        }),
      });

      if (response.ok) {
        // Refresh project data
        const projectResponse = await fetch('/api/projects');
        const updatedProjects = await projectResponse.json();
        setProjects(updatedProjects);
      }
    } catch (error) {
      console.error('Failed to create task:', error);
    }
    setShowCreateTask(false);
  };

  return (
    <ProjectsContainer>
      <Title>📁 Projects</Title>
      <AddProjectForm onSubmit={handleAdd}>
        <AddInput
          value={newProject}
          onChange={e => setNewProject(e.target.value)}
          placeholder="Add a project..."
        />
        <AddButton type="submit">Add</AddButton>
      </AddProjectForm>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && projects.length === 0 && <div style={{ color: '#888' }}>No projects yet.</div>}
      {selectedProject ? (
        <div>
          <h2>{selectedProject.name}</h2>
          <button onClick={() => setSelectedProject(null)}>Back to Projects</button>
          <NewTaskButton onClick={() => setShowCreateTask(true)}>New Task</NewTaskButton>
          <div>
            {selectedProject.tasks?.map((task: any) => (
              <div key={task.id}>
                <input type="checkbox" checked={task.completed} readOnly />
                {task.title}
              </div>
            ))}
          </div>
        </div>
      ) : (
        projects.map(project => (
          <ProjectCard key={project.id} onClick={() => handleProjectClick(project)}>
            {project.name}
            <DeleteButton onClick={() => handleDelete(project.id)}>Delete</DeleteButton>
          </ProjectCard>
        ))
      )}
      {showCreateTask && (
        <CreateTaskModal
          onClose={() => setShowCreateTask(false)}
          onCreateTask={handleCreateTask}
        />
      )}
    </ProjectsContainer>
  );
};

export default ProjectsList;
