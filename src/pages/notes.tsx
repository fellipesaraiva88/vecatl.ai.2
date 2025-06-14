import React from 'react';
import Sidebar from '../components/Sidebar';
import NotesTimeline from '../components/NotesTimeline';
import styles from './notes.module.css';

const NotesPage = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <NotesTimeline />
      </main>
    </div>
  );
};

export default NotesPage;
