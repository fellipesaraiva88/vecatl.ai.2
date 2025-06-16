import React, { useEffect, useState } from "react";
import ProjectDialog from "./ProjectDialog";
import { TRANSLATIONS } from "../constants/translations";

type Project = {
  id: string;
  name: string;
  description?: string;
};

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const handleCreate = (project: any) => {
    setProjects([project, ...projects]);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects(projects.filter((p: any) => p.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        <div style={styles.header}>
          <h2 style={styles.heading}>{TRANSLATIONS.projects.title}</h2>
          <button onClick={() => setShowDialog(true)} style={styles.addBtn}>
            {TRANSLATIONS.projects.newProject}
          </button>
        </div>

        <div style={styles.list}>
          {projects.map((project: any) => (
            <div key={project.id} style={styles.card}>
              <div>
                <h3 style={styles.title}>{project.name}</h3>
                {project.description && (
                  <p style={styles.desc}>{project.description}</p>
                )}
              </div>
              <button onClick={() => handleDelete(project.id)} style={styles.deleteBtn}>
                ✕
              </button>
            </div>
          ))}
        </div>

        {showDialog && (
          <ProjectDialog onClose={() => setShowDialog(false)} onCreate={handleCreate} />
        )}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    minHeight: '100vh',
    background: '#121212',
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  inner: {
    width: '100%',
    maxWidth: 720,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 600,
    margin: 0,
    color: '#fff',
  },
  addBtn: {
    background: '#0070f3',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    fontSize: 14,
    borderRadius: 12,
    cursor: 'pointer',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  card: {
    background: '#1e1e1e',
    padding: '18px 20px',
    borderRadius: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'relative',
    color: '#fff',
  },
  title: {
    fontSize: 17,
    fontWeight: 600,
    margin: 0,
    color: '#fff',
  },
  desc: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 4,
  },
  deleteBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    background: 'transparent',
    border: 'none',
    fontSize: 18,
    color: '#aaa',
    cursor: 'pointer',
  },
};