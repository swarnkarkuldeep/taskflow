
import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  darkMode: boolean;
  loading?: boolean;
  error?: string | null;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  darkMode,
  loading = false,
  error = null,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-pulse text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${darkMode ? 'bg-purple-500/20' : 'bg-pink-500/20'}`}></div>
          <p className={`text-lg ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 rounded-2xl ${darkMode ? 'bg-red-900/20 text-red-200' : 'bg-red-100 text-red-700'} text-center`}>
        <p className="font-medium">Error loading tasks</p>
        <p className="text-sm opacity-80 mt-1">{error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className={`text-center py-12 px-4 rounded-2xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'} border border-dashed ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${darkMode ? 'bg-purple-500/10 text-purple-300' : 'bg-pink-500/10 text-pink-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
        </div>
        <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>No tasks yet</h3>
        <p className={`mt-1 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Get started by creating a new task</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 30}ms` }}
        >
          <TaskItem
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
            darkMode={darkMode}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
