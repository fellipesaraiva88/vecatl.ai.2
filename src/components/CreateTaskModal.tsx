import { useState } from 'react';
import styles from './CreateTaskModal.module.css';

interface CreateTaskModalProps {
  onClose: () => void;
  onCreateTask: (task: {
    name: string;
    description: string;
    dueDate: string;
    importance: string;
    project: string;
    recurring: boolean;
  }) => void;
}

const CreateTaskModal = ({ onClose, onCreateTask }: CreateTaskModalProps) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [importance, setImportance] = useState('Med');
  const [project, setProject] = useState('No Project');
  const [recurring, setRecurring] = useState(false);

  const importanceLevels = ['Min', 'Low', 'Med', 'High', 'Max'];

  const handleCreateTask = () => {
    onCreateTask({
      name: taskName,
      description,
      dueDate,
      importance,
      project,
      recurring,
    });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.header}>Create Task</h2>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Task Name</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter task name..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Due Date</label>
          <input
            type="date"
            className={styles.input}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Importance</label>
          <div className={styles.importanceGroup}>
            {importanceLevels.map((level) => (
              <button
                key={level}
                className={`${styles.importanceButton} ${importance === level ? styles.active : ''}`}
                onClick={() => setImportance(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <textarea
            className={styles.textarea}
            placeholder="Add more context about this task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Project</label>
          <select
            className={styles.input}
            value={project}
            onChange={(e) => setProject(e.target.value)}
          >
            <option value="No Project">No Project</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <input
              type="checkbox"
              checked={recurring}
              onChange={(e) => setRecurring(e.target.checked)}
            />
            Recurring
          </label>
        </div>

        <div className={styles.actions}>
          <button className={`${styles.button} ${styles.cancelButton}`} onClick={onClose}>
            Cancel
          </button>
          <button className={`${styles.button} ${styles.createButton}`} onClick={handleCreateTask}>
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
