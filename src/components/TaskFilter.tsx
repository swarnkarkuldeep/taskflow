
import React from 'react';
import { TaskFilter as FilterType } from '../types/task';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    completed: number;
    pending: number;
  };
  darkMode: boolean;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ currentFilter, onFilterChange, taskCounts, darkMode }) => {
  const filters: { key: FilterType; label: string; count: number; emoji: string }[] = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all, emoji: '📋' },
    { key: 'pending', label: 'Pending', count: taskCounts.pending, emoji: '⏳' },
    { key: 'completed', label: 'Completed', count: taskCounts.completed, emoji: '✅' },
  ];

  return (
    <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10' : 'bg-white/30'} rounded-3xl shadow-xl p-3 inline-flex animate-fade-in border gap-4 ${darkMode ? 'border-white/20' : 'border-white/40'} ${darkMode ? 'hover:bg-white/15' : 'hover:bg-white/40'} transition-all duration-300`}>
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-3 text-lg ${
            currentFilter === filter.key
              ? `bg-gradient-to-r ${darkMode ? 'from-purple-500 to-blue-500' : 'from-blue-500 to-indigo-600'} text-white shadow-lg transform scale-105`
              : `${darkMode ? 'text-white/80 hover:text-white' : 'text-slate-700/80 hover:text-slate-800'} ${darkMode ? 'hover:bg-white/10' : 'hover:bg-white/30'} backdrop-blur-sm`
          }`}
        >
          <span className="text-xl">{filter.emoji}</span>
          {filter.label}
          <span className={`text-sm px-3 py-1 rounded-full font-bold ${
            currentFilter === filter.key
              ? 'bg-white/20 text-white'
              : `${darkMode ? 'bg-white/10 text-white/70' : 'bg-white/40 text-slate-700/80'} backdrop-blur-sm`
          }`}>
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
