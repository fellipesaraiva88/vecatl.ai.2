import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Sidebar.module.css';
import { FaTasks, FaLightbulb, FaProjectDiagram, FaStickyNote, FaRobot } from 'react-icons/fa';

const Sidebar = () => {
  const router = useRouter();
  const navItems = [
    { name: 'Tasks', icon: <FaTasks />, path: '/tasks' },
    { name: 'Ideas', icon: <FaLightbulb />, path: '/ideas' },
    { name: 'Projects', icon: <FaProjectDiagram />, path: '/projects' },
    { name: 'Notes', icon: <FaStickyNote />, path: '/notes' },
    
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>N</div>
      <ul className={styles.nav}>
        {navItems.map(({ name, icon, path }) => (
          <li
            key={name}
            className={`${styles.navItem} ${router.pathname === path ? styles.active : ''}`}
          >
            <Link href={path}>
              <div className={styles.link}>
                {icon}
                <span>{name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
