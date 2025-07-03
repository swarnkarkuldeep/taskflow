
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  category?: string;
  userId: string; // Added to associate tasks with users
}

export type TaskFilter = 'all' | 'completed' | 'pending';

export type TaskPriority = 'low' | 'medium' | 'high';
