// Main App Component with Redux Integration
// This component integrates all task management features using Redux Toolkit
// Implements full CRUD operations with a clean UI

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTask,
  updateTask,
  deleteTask,
  toggleTask,
  clearCompletedTasks,
} from './taskSlice';
import { selectAllTasks } from './taskSlice';
import './App.css';

function App() {
  // State for form input
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Redux dispatch and selector
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  // Handle adding a new task
  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      dispatch(
        addTask({
          title: newTaskTitle.trim(),
          completed: false,
          description: '',
        })
      );
      setNewTaskTitle('');
    }
  };

  // Handle updating a task
  const handleUpdateTask = (id) => {
    if (editingText.trim()) {
      dispatch(
        updateTask({
          id,
          title: editingText.trim(),
        })
      );
      setEditingId(null);
      setEditingText('');
    }
  };

  // Handle task completion toggle
  const handleToggleTask = (id) => {
    dispatch(toggleTask(id));
  };

  // Handle task deletion
  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  // Handle clearing completed tasks
  const handleClearCompleted = () => {
    dispatch(clearCompletedTasks());
  };

  // Handle editing task
  const handleStartEdit = (id, currentTitle) => {
    setEditingId(id);
    setEditingText(currentTitle);
  };

  // Handle cancelling edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <h1>📝 Redux Todo App</h1>
        <p className="subtitle">Full CRUD operations with Redux Toolkit</p>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {/* Input Section - CREATE Operation */}
        <div className="input-section">
          <h2>Add a New Task</h2>
          <div className="input-group">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              placeholder="Enter a new task..."
              className="task-input"
            />
            <button onClick={handleAddTask} className="btn btn-add">
              ➕ Add Task
            </button>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="stats-section">
          <div className="stat-box">
            <span className="stat-label">Total Tasks:</span>
            <span className="stat-value">{totalCount}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Completed:</span>
            <span className="stat-value completed">{completedCount}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Pending:</span>
            <span className="stat-value pending">{totalCount - completedCount}</span>
          </div>
        </div>

        {/* Tasks List Section - READ & UPDATE & DELETE Operations */}
        <div className="tasks-section">
          <h2>Tasks List</h2>
          {tasks.length === 0 ? (
            <div className="empty-state">
              <p>📭 No tasks yet. Create one to get started!</p>
            </div>
          ) : (
            <ul className="tasks-list">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`task-item ${task.completed ? 'completed' : ''}`}
                >
                  {editingId === task.id ? (
                    // Edit Mode
                    <div className="task-edit-mode">
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="task-edit-input"
                        autoFocus
                      />
                      <button
                        onClick={() => handleUpdateTask(task.id)}
                        className="btn btn-save"
                      >
                        ✅ Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="btn btn-cancel"
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  ) : (
                    // Display Mode
                    <div className="task-display-mode">
                      <div className="task-content">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleToggleTask(task.id)}
                          className="task-checkbox"
                        />
                        <span className="task-title">{task.title}</span>
                      </div>
                      <div className="task-actions">
                        <button
                          onClick={() =>
                            handleStartEdit(task.id, task.title)
                          }
                          className="btn btn-edit"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="btn btn-delete"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Clear Completed Tasks Button */}
          {completedCount > 0 && (
            <div className="clear-section">
              <button
                onClick={handleClearCompleted}
                className="btn btn-clear-completed"
              >
                🧹 Clear Completed Tasks ({completedCount})
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Built with React + Redux Toolkit | Full CRUD Implementation</p>
      </footer>
    </div>
  );
}

export default App;