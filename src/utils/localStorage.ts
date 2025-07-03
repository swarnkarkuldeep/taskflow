
import { Task } from '../types/task';

const USER_KEY = 'taskflow_user';
const TASKS_KEY = 'taskflow_tasks';

export const saveUser = (username: string): void => {
  localStorage.setItem(USER_KEY, username);
};

export const getUser = (): string | null => {
  return localStorage.getItem(USER_KEY);
};

export const clearUser = (): void => {
  localStorage.removeItem(USER_KEY);
};

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const getTasks = (): Task[] => {
  const tasksJson = localStorage.getItem(TASKS_KEY);
  if (tasksJson) {
    try {
      return JSON.parse(tasksJson) || [];
    } catch (error) {
      console.error('Error parsing tasks from localStorage:', error);
      return [];
    }
  }
  return [];
};

export const getUserTasks = (userId: string): Task[] => {
  const allTasks = getTasks();
  return allTasks.filter(task => task.userId === userId).map(task => ({
    ...task,
    priority: task.priority || 'medium',
    dueDate: task.dueDate || undefined,
    category: task.category || undefined,
  }));
};

export const saveUserTask = (task: Task, userId: string): void => {
  const tasks = getTasks();
  const existingTaskIndex = tasks.findIndex(t => t.id === task.id);
  const taskWithUser = { ...task, userId };
  
  if (existingTaskIndex >= 0) {
    tasks[existingTaskIndex] = taskWithUser;
  } else {
    tasks.push(taskWithUser);
  }
  
  saveTasks(tasks);
};

export const deleteUserTask = (taskId: string, userId: string): void => {
  const tasks = getTasks();
  const filteredTasks = tasks.filter(task => !(task.id === taskId && task.userId === userId));
  saveTasks(filteredTasks);
};

export const clearUserTasks = (userId: string): void => {
  const tasks = getTasks();
  const filteredTasks = tasks.filter(task => task.userId !== userId);
  saveTasks(filteredTasks);
};

export const clearAllTasks = (): void => {
  localStorage.removeItem(TASKS_KEY);
};
