// Redux Slice for Task Management
// This slice handles all task-related state and actions (CRUD operations)
// Using Redux Toolkit's createSlice for simplified action creators and reducers

import { createSlice } from '@reduxjs/toolkit';

// Initial state for tasks
const initialState = {
  items: [], // Array to store all tasks
  loading: false, // Loading state for async operations
  error: null, // Error state
};

// Create the task slice with all CRUD actions
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // CREATE - Add a new task
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        ...action.payload,
        createdAt: new Date().toISOString(),
      };
      state.items.push(newTask);
    },

    // READ - Get all tasks (handled by selector)
    // The state itself serves as the read operation

    // UPDATE - Update an existing task
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const taskIndex = state.items.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.items[taskIndex] = {
          ...state.items[taskIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    // UPDATE - Toggle task completion status
    toggleTask: (state, action) => {
      const task = state.items.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.updatedAt = new Date().toISOString();
      }
    },

    // DELETE - Delete a task
    deleteTask: (state, action) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },

    // DELETE - Clear all completed tasks
    clearCompletedTasks: (state) => {
      state.items = state.items.filter((task) => !task.completed);
    },

    // SET LOADING STATE
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // SET ERROR STATE
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  addTask,
  updateTask,
  toggleTask,
  deleteTask,
  clearCompletedTasks,
  setLoading,
  setError,
} = taskSlice.actions;

// Export selectors for reading state
export const selectAllTasks = (state) => state.tasks.items;
export const selectTaskById = (state, id) =>
  state.tasks.items.find((task) => task.id === id);
export const selectCompletedTasks = (state) =>
  state.tasks.items.filter((task) => task.completed);
export const selectIncompleteTasks = (state) =>
  state.tasks.items.filter((task) => !task.completed);
export const selectTaskCount = (state) => state.tasks.items.length;

// Export reducer as default
export default taskSlice.reducer;