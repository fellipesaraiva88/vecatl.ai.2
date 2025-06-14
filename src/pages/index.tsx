import React, { useState } from 'react';
import ChatScreen from '../components/ChatScreen';
import IdeasList from '../components/IdeasList';
import ProjectsList from '../components/ProjectsList';
import NotesTimeline from '../components/NotesTimeline';
import TasksList from '../components/TasksList';
import styles from './index.module.css';

export default function Home() {
  const [activeSection, setActiveSection] = useState('Ideas');

  const renderSection = () => {
    switch (activeSection) {
      case 'Ideas':
        return <IdeasList />;
      case 'Projects':
        return <ProjectsList />;
      case 'Notes':
        return <NotesTimeline />;
      case 'Tasks':
        return <TasksList />;
      default:
        return <IdeasList />;
    }
  };

  return (
    <div className={styles.container}>
      <ChatScreen />
      <div className={styles.sidebar}>
        <button onClick={() => setActiveSection('Ideas')}>Ideas</button>
        <button onClick={() => setActiveSection('Projects')}>Projects</button>
        <button onClick={() => setActiveSection('Notes')}>Notes</button>
        <button onClick={() => setActiveSection('Tasks')}>Tasks</button>
      </div>
      <div className={styles.mainContent}>{renderSection()}</div>
    </div>
  );
}
