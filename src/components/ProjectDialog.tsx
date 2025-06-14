import React, { useState } from "react";

type Project = {
  id: string;
  name: string;
  description?: string;
};

interface ProjectDialogProps {
  onClose: () => void;
  onCreate: (project: Project) => void;
}

export default function ProjectDialog({ onClose, onCreate }: ProjectDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [context, setContext] = useState("");
  const [excludeContext, setExcludeContext] = useState(false);
  const [color, setColor] = useState("orange");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, context, excludeContext, color }),
    });

    const newProject = await res.json();
    onCreate(newProject);
    onClose();
  };

  const colorOptions = [
    "red", "orange", "yellow", "green", "teal",
    "blue", "purple", "pink"
  ];

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <div style={styles.header}>
          <h2 style={styles.title}>Edit Project</h2>
          <button style={styles.close} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Project Name</label>
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter project name..."
            required
          />

          <label style={styles.label}>
            Description <span style={styles.optional}>(optional)</span>
          </label>
          <input
            style={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div style={styles.teamText}>
            Team project <span style={styles.upgrade}>Upgrade to share with team →</span>
          </div>

          <label style={styles.label}>
            Context <span style={styles.optional}>(optional)</span>
          </label>
          <textarea
            style={styles.textarea}
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />

          <div style={styles.row}>
            <span style={styles.toggleLabel}>Exclude user context</span>
            <label style={styles.switch}>
              <input
                type="checkbox"
                checked={excludeContext}
                onChange={() => setExcludeContext(!excludeContext)}
              />
              <span style={styles.slider}></span>
            </label>
          </div>

          <div style={{ ...styles.labelRow }}>
            <span style={styles.label}>Color</span>
            <span style={{ ...styles.selectedDot, backgroundColor: color }} />
          </div>

          <div style={styles.colorGrid}>
            {colorOptions.map((c) => (
              <div
                key={c}
                style={{
                  ...styles.colorDot,
                  backgroundColor: c,
                  border: color === c ? "3px solid #fff" : "1px solid #444",
                }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>

          <div style={styles.footer}>
            <button type="button" style={styles.deleteBtn}>🗑 Delete</button>
            <button type="submit" style={styles.saveBtn}>💾 Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  dialog: {
    background: "#1f1f1f",
    padding: 32,
    borderRadius: 24,
    width: "95%",
    maxWidth: 600,
    color: "#fff",
    boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
    position: "relative",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
  },
  close: {
    background: "none",
    border: "none",
    fontSize: 26,
    color: "#999",
    cursor: "pointer",
  },
  label: {
    fontWeight: 500,
    marginTop: 18,
    marginBottom: 4,
    fontSize: 15,
  },
  labelRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 18,
  },
  selectedDot: {
    width: 16,
    height: 16,
    borderRadius: "50%",
    border: "2px solid white",
  },
  optional: {
    color: "#aaa",
    fontSize: 13,
    marginLeft: 4,
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #444",
    backgroundColor: "#292929",
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
  },
  textarea: {
    width: "100%",
    minHeight: 100,
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #444",
    backgroundColor: "#292929",
    color: "#fff",
    fontSize: 14,
    marginBottom: 16,
  },
  teamText: {
    marginTop: 10,
    fontSize: 13,
    color: "#bbb",
  },
  upgrade: {
    marginLeft: 6,
    color: "#4ab3ff",
    cursor: "pointer",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
  },
  toggleLabel: {
    fontSize: 14,
    color: "#ccc",
  },
  switch: {
    position: "relative",
    display: "inline-block",
    width: 42,
    height: 24,
  },
  slider: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "#555",
    borderRadius: 20,
    cursor: "pointer",
    transition: ".4s",
    boxShadow: "inset 0 0 2px #000",
  },
  colorGrid: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 12,
    marginBottom: 24,
  },
  colorDot: {
    width: 26,
    height: 26,
    borderRadius: "50%",
    cursor: "pointer",
    boxSizing: "border-box",
    transition: "0.2s",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: 12,
    cursor: "pointer",
    fontSize: 14,
  },
  saveBtn: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
  },
};
