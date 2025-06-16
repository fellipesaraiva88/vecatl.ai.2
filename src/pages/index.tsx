import React, { useState } from 'react';
import ChatScreen from '../components/ChatScreen';
import IdeasList from '../components/IdeasList';
import ProjectsList from '../components/ProjectsList';
import NotesTimeline from '../components/NotesTimeline';
import TasksList from '../components/TasksList';
import styles from './index.module.css';
import { TRANSLATIONS } from '../constants/translations';

export default function Home() {
  const [activeSection, setActiveSection] = useState('Ideias');

  const renderSection = () => {
    switch (activeSection) {
      case 'Ideias':
        return <IdeasList />;
      case 'Projetos':
        return <ProjectsList />;
      case 'Anotações':
        return <NotesTimeline />;
      case 'Tarefas':
        return <TasksList />;
      default:
        return <IdeasList />;
    }
  };

  return (
    <div className={styles.container}>
      <ChatScreen />
      <div className={styles.sidebar}>
        <button onClick={() => setActiveSection('Ideias')}>{TRANSLATIONS.nav.ideas}</button>
        <button onClick={() => setActiveSection('Projetos')}>{TRANSLATIONS.nav.projects}</button>
        <button onClick={() => setActiveSection('Anotações')}>{TRANSLATIONS.nav.notes}</button>
        <button onClick={() => setActiveSection('Tarefas')}>{TRANSLATIONS.nav.tasks}</button>
      </div>
      <div className={styles.mainContent}>{renderSection()}</div>
    </div>
  );
}
