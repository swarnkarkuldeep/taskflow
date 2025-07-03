import React, { useState, useEffect } from 'react';
import { X, Sparkles, Calendar, Flag, Tag } from 'lucide-react';
import { Task } from '../types/task';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (data: { title: string; description: string; priority: 'low' | 'medium' | 'high'; dueDate?: string; category?: string }) => void;
  onCancel: () => void;
  darkMode: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel, darkMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setDueDate(task.dueDate || '');
      setCategory(task.category || '');
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate: dueDate || undefined,
        category: category.trim() || undefined,
      });
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setCategory('');
    }
  };

  const priorityColors = {
    low: darkMode ? 'from-green-500 to-emerald-500' : 'from-green-400 to-emerald-400',
    medium: darkMode ? 'from-yellow-500 to-orange-500' : 'from-yellow-400 to-orange-400',
    high: darkMode ? 'from-red-500 to-pink-500' : 'from-red-400 to-pink-400',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Sparkles className={`w-6 h-6 ${darkMode ? 'text-purple-300' : 'text-blue-500'} animate-pulse transition-colors duration-500`} />
          <h2 className={`text-3xl font-bold bg-gradient-to-r ${darkMode ? 'from-white via-purple-200 to-blue-200' : 'from-slate-800 via-blue-600 to-indigo-700'} bg-clip-text text-transparent transition-all duration-500`}>
            {task ? 'Edit Task' : 'Add New Task'}
          </h2>
        </div>
        <button
          onClick={onCancel}
          className={`p-3 ${darkMode ? 'hover:bg-white/10 text-white/70 hover:text-white' : 'hover:bg-white/30 text-slate-600/70 hover:text-slate-800'} rounded-2xl transition-all duration-300 backdrop-blur-sm border ${darkMode ? 'border-white/20' : 'border-white/40'} ${darkMode ? 'hover:border-white/30' : 'hover:border-white/60'} hover:scale-110 transform`}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className={`block text-lg font-medium ${darkMode ? 'text-white/90' : 'text-slate-800/90'} mb-3 transition-colors duration-500`}>
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-5 py-4 backdrop-blur-sm ${darkMode ? 'bg-white/10 text-white placeholder-white/50' : 'bg-white/40 text-slate-800 placeholder-slate-600/70'} border ${darkMode ? 'border-white/20' : 'border-white/40'} rounded-2xl focus:ring-2 ${darkMode ? 'focus:ring-purple-400/50 focus:border-purple-400/50' : 'focus:ring-blue-500/50 focus:border-blue-500/50'} ${darkMode ? 'focus:bg-white/15' : 'focus:bg-white/50'} transition-all duration-300 text-lg`}
            placeholder="Enter task title..."
            required
            autoFocus
          />
        </div>

        <div>
          <label htmlFor="description" className={`block text-lg font-medium ${darkMode ? 'text-white/90' : 'text-slate-800/90'} mb-3 transition-colors duration-500`}>
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={`w-full px-5 py-4 backdrop-blur-sm ${darkMode ? 'bg-white/10 text-white placeholder-white/50' : 'bg-white/40 text-slate-800 placeholder-slate-600/70'} border ${darkMode ? 'border-white/20' : 'border-white/40'} rounded-2xl focus:ring-2 ${darkMode ? 'focus:ring-purple-400/50 focus:border-purple-400/50' : 'focus:ring-blue-500/50 focus:border-blue-500/50'} ${darkMode ? 'focus:bg-white/15' : 'focus:bg-white/50'} transition-all duration-300 resize-none text-lg`}
            placeholder="Add a description (optional)..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="priority" className={`block text-lg font-medium ${darkMode ? 'text-white/90' : 'text-slate-800/90'} mb-3 transition-colors duration-500 flex items-center gap-2`}>
              <Flag className="w-5 h-5" />
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className={`w-full px-5 py-4 backdrop-blur-sm ${darkMode ? 'bg-white/10 text-white' : 'bg-white/40 text-slate-800'} border ${darkMode ? 'border-white/20' : 'border-white/40'} rounded-2xl focus:ring-2 ${darkMode ? 'focus:ring-purple-400/50 focus:border-purple-400/50' : 'focus:ring-blue-500/50 focus:border-blue-500/50'} ${darkMode ? 'focus:bg-white/15' : 'focus:bg-white/50'} transition-all duration-300 text-lg`}
            >
              <option value="low" className="bg-slate-800 text-white">Low Priority</option>
              <option value="medium" className="bg-slate-800 text-white">Medium Priority</option>
              <option value="high" className="bg-slate-800 text-white">High Priority</option>
            </select>
          </div>

          <div>
            <label htmlFor="dueDate" className={`block text-lg font-medium ${darkMode ? 'text-white/90' : 'text-slate-800/90'} mb-3 transition-colors duration-500 flex items-center gap-2`}>
              <Calendar className="w-5 h-5" />
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={`w-full px-5 py-4 backdrop-blur-sm ${darkMode ? 'bg-white/10 text-white' : 'bg-white/40 text-slate-800'} border ${darkMode ? 'border-white/20' : 'border-white/40'} rounded-2xl focus:ring-2 ${darkMode ? 'focus:ring-purple-400/50 focus:border-purple-400/50' : 'focus:ring-blue-500/50 focus:border-blue-500/50'} ${darkMode ? 'focus:bg-white/15' : 'focus:bg-white/50'} transition-all duration-300 text-lg`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="category" className={`block text-lg font-medium ${darkMode ? 'text-white/90' : 'text-slate-800/90'} mb-3 transition-colors duration-500 flex items-center gap-2`}>
            <Tag className="w-5 h-5" />
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full px-5 py-4 backdrop-blur-sm ${darkMode ? 'bg-white/10 text-white placeholder-white/50' : 'bg-white/40 text-slate-800 placeholder-slate-600/70'} border ${darkMode ? 'border-white/20' : 'border-white/40'} rounded-2xl focus:ring-2 ${darkMode ? 'focus:ring-purple-400/50 focus:border-purple-400/50' : 'focus:ring-blue-500/50 focus:border-blue-500/50'} ${darkMode ? 'focus:bg-white/15' : 'focus:bg-white/50'} transition-all duration-300 text-lg`}
            placeholder="e.g., Work, Personal, Shopping..."
          />
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={!title.trim()}
            className={`flex-1 bg-gradient-to-r ${darkMode ? 'from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600' : 'from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'} text-white py-4 px-6 rounded-2xl font-medium focus:ring-2 ${darkMode ? 'focus:ring-purple-400/50' : 'focus:ring-blue-500/50'} focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-lg shadow-xl hover:scale-105 transform`}
          >
            {task ? 'Update Task ✨' : 'Add Task ✨'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className={`px-8 py-4 ${darkMode ? 'text-white/80 hover:text-white' : 'text-slate-700/80 hover:text-slate-800'} backdrop-blur-sm ${darkMode ? 'bg-white/10' : 'bg-white/40'} border ${darkMode ? 'border-white/20' : 'border-white/40'} rounded-2xl ${darkMode ? 'hover:bg-white/20' : 'hover:bg-white/50'} focus:ring-2 focus:ring-white/30 font-medium transition-all duration-300 text-lg hover:scale-105 transform`}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
