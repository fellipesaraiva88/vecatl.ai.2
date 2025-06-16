import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Sidebar.module.css';
import { FaTasks, FaLightbulb, FaProjectDiagram, FaStickyNote, FaHome } from 'react-icons/fa';
import { TRANSLATIONS } from '../constants/translations';

const Sidebar = () => {
  const router = useRouter();
  const navItems = [
    { name: TRANSLATIONS.nav.home, icon: <FaHome />, path: '/' },
    { name: TRANSLATIONS.nav.tasks, icon: <FaTasks />, path: '/tasks' },
    { name: TRANSLATIONS.nav.ideas, icon: <FaLightbulb />, path: '/ideas' },
    { name: TRANSLATIONS.nav.projects, icon: <FaProjectDiagram />, path: '/projects' },
    { name: TRANSLATIONS.nav.notes, icon: <FaStickyNote />, path: '/notes' },
  ];

  return (
    <div className={`${styles.sidebar} glass`}>
      <div className={styles.logoSection}>
        <div className={styles.logo}>
          <span className={styles.logoText}>V</span>
        </div>
        <h2 className={styles.brandName}>Vectal</h2>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map(({ name, icon, path }) => (
            <li key={name} className={styles.navItem}>
              <Link href={path} className={`${styles.link} ${router.pathname === path ? styles.active : ''}`}>
                <div className={styles.linkContent}>
                  <span className={styles.icon}>{icon}</span>
                  <span className={styles.text}>{name}</span>
                </div>
                {router.pathname === path && <div className={styles.activeIndicator} />}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>U</div>
          <span className={styles.userName}>Usuário</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
