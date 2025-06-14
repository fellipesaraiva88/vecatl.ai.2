import React, { useState } from 'react';

export default function TaskDialog({ onClose, onCreate }: { onClose: () => void; onCreate: (task: any) => void }) {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [importance, setImportance] = useState(50);
  const [description, setDescription] = useState('');
  const [project, setProject] = useState('No Project');
  const [recurring, setRecurring] = useState(false);

  const handleCreate = () => {
    onCreate({ taskName, dueDate, importance, description, project, recurring });
    onClose();
  };

  return (
    <div className="dialog">
      <h2>Create Task</h2>
      <input
        type="text"
        placeholder="Enter task name..."
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <div className="importance-slider">
        <label>Importance</label>
        <input
          type="range"
          min="0"
          max="100"
          value={importance}
          onChange={(e) => setImportance(Number(e.target.value))}
        />
      </div>
      <textarea
        placeholder="Add more context about this task..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={project} onChange={(e) => setProject(e.target.value)}>
        <option>No Project</option>
        <option>Project A</option>
        <option>Project B</option>
      </select>
      <div className="recurring-toggle">
        <label>Recurring</label>
        <input
          type="checkbox"
          checked={recurring}
          onChange={(e) => setRecurring(e.target.checked)}
        />
      </div>
      <button onClick={handleCreate}>Create Task</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
