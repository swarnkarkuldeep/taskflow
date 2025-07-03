
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
      const parsedTasks = JSON.parse(tasksJson);
      // Migrate old tasks to new format
      return parsedTasks.map((task: any) => ({
        ...task,
        priority: task.priority || 'medium',
        dueDate: task.dueDate || undefined,
        category: task.category || undefined,
      }));
    } catch (error) {
      console.error('Error parsing tasks from localStorage:', error);
      return [];
    }
  }
  return [];
};

export const clearTasks = (): void => {
  localStorage.removeItem(TASKS_KEY);
};
