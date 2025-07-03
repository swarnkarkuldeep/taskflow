
import React, { useState } from 'react';
import { Check, Edit, Trash2, Calendar, Sparkles, Flag, Tag, Clock } from 'lucide-react';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  darkMode: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onEdit, onDelete, darkMode }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(task.id);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays <= 7) return `Due in ${diffDays} days`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return darkMode ? 'border-l-red-400 bg-red-500/10' : 'border-l-red-500 bg-red-100/50';
      case 'medium':
        return darkMode ? 'border-l-yellow-400 bg-yellow-500/10' : 'border-l-yellow-500 bg-yellow-100/50';
      case 'low':
        return darkMode ? 'border-l-green-400 bg-green-500/10' : 'border-l-green-500 bg-green-100/50';
      default:
        return darkMode ? 'border-l-purple-400' : 'border-l-purple-500';
    }
  };

  const getPriorityIcon = (priority: string) => {
    const baseClass = "w-4 h-4";
    switch (priority) {
      case 'high':
        return <Flag className={`${baseClass} text-red-400`} />;
      case 'medium':
        return <Flag className={`${baseClass} text-yellow-400`} />;
      case 'low':
        return <Flag className={`${baseClass} text-green-400`} />;
      default:
        return <Flag className={`${baseClass} text-gray-400`} />;
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`backdrop-blur-xl bg-white/10 rounded-3xl shadow-xl border-l-4 p-4 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:bg-white/15 border border-white/20 group ${
      task.completed 
        ? darkMode ? 'border-l-green-400 bg-green-500/10' : 'border-l-green-500 bg-green-100/50'
        : getPriorityColor(task.priority)
    } ${isOverdue ? 'animate-pulse' : ''}`}>
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 md:gap-6">
        {/* Complete Toggle */}
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`mt-0.5 sm:mt-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 transform ${
            task.completed
              ? 'bg-gradient-to-r from-green-400 to-emerald-400 border-green-400 text-white shadow-lg'
              : `${darkMode ? 'border-white/40 hover:border-purple-400' : 'border-gray-400/40 hover:border-pink-400'} backdrop-blur-sm bg-white/10 ${darkMode ? 'hover:bg-purple-400/20' : 'hover:bg-pink-400/20'} transition-colors duration-300`
          }`}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && <Check className="w-4 h-4" />}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-3">
            {!task.completed && <Sparkles className={`w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? 'text-purple-300' : 'text-pink-500'} animate-pulse mt-0.5 sm:mt-1 flex-shrink-0 transition-colors duration-500`} />}
            <h3 className={`font-bold text-lg sm:text-xl leading-tight transition-all duration-300 ${
              task.completed 
                ? darkMode ? 'text-white/60 line-through' : 'text-gray-600/60 line-through'
                : darkMode ? 'text-white group-hover:text-purple-200' : 'text-gray-800 group-hover:text-pink-600'
            }`}>
              {task.title}
            </h3>
          </div>
          
          {task.description && (
            <p className={`mb-4 leading-relaxed text-lg transition-colors duration-300 ${
              task.completed 
                ? darkMode ? 'text-white/50' : 'text-gray-600/50'
                : darkMode ? 'text-white/80 group-hover:text-white/90' : 'text-gray-700/80 group-hover:text-gray-800/90'
            }`}>
              {task.description}
            </p>
          )}

          {/* Task Metadata */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            {/* Priority */}
            <div className="flex items-center gap-2 backdrop-blur-sm bg-white/5 rounded-xl sm:rounded-2xl px-2 py-1 sm:px-3 sm:py-2">
              {getPriorityIcon(task.priority)}
              <span className={`text-sm font-medium capitalize ${darkMode ? 'text-white/70' : 'text-gray-600/70'} transition-colors duration-300`}>
                {task.priority} Priority
              </span>
            </div>

            {/* Category */}
            {task.category && (
              <div className="flex items-center gap-2 backdrop-blur-sm bg-white/5 rounded-xl sm:rounded-2xl px-2 py-1 sm:px-3 sm:py-2">
                <Tag className={`w-4 h-4 ${darkMode ? 'text-white/60' : 'text-gray-600/60'} transition-colors duration-300`} />
                <span className={`text-sm font-medium ${darkMode ? 'text-white/70' : 'text-gray-600/70'} transition-colors duration-300`}>
                  {task.category}
                </span>
              </div>
            )}

            {/* Due Date */}
            {task.dueDate && (
              <div className={`flex items-center gap-2 backdrop-blur-sm rounded-2xl px-3 py-2 ${
                isOverdue 
                  ? 'bg-red-500/20 text-red-300' 
                  : 'bg-white/5'
              }`}>
                <Clock className={`w-4 h-4 ${isOverdue ? 'text-red-300' : darkMode ? 'text-white/60' : 'text-gray-600/60'} transition-colors duration-300`} />
                <span className={`text-sm font-medium ${
                  isOverdue 
                    ? 'text-red-300 font-bold' 
                    : darkMode ? 'text-white/70' : 'text-gray-600/70'
                } transition-colors duration-300`}>
                  {formatDueDate(task.dueDate)}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center backdrop-blur-sm bg-white/5 rounded-xl sm:rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 inline-flex">
            <Calendar className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 ${darkMode ? 'text-white/60' : 'text-gray-600/60'} transition-colors duration-300`} />
            <span className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-600/60'} transition-colors duration-300`}>
              <span className="hidden sm:inline">Created</span> {formatDate(task.createdAt)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 mt-4 sm:mt-0 ml-auto sm:ml-0">
          <button
            onClick={() => onEdit(task)}
            className={`p-2 sm:p-3 ${darkMode ? 'text-white/70 hover:text-purple-300 hover:bg-purple-500/20' : 'text-gray-600/70 hover:text-pink-500 hover:bg-pink-500/20'} rounded-xl sm:rounded-2xl transition-all duration-300 backdrop-blur-sm border border-white/20 ${darkMode ? 'hover:border-purple-400/50' : 'hover:border-pink-400/50'} hover:scale-110 transform`}
            title="Edit task"
            aria-label="Edit task"
          >
            <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <button
            onClick={handleDelete}
            className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 backdrop-blur-sm border hover:scale-110 transform ${
              showDeleteConfirm
                ? 'text-red-300 bg-red-500/20 border-red-400/50 animate-pulse'
                : `${darkMode ? 'text-white/70 hover:text-red-300' : 'text-gray-600/70 hover:text-red-500'} hover:bg-red-500/20 border-white/20 hover:border-red-400/50`
            }`}
            title={showDeleteConfirm ? 'Click again to confirm deletion' : 'Delete task'}
            aria-label={showDeleteConfirm ? 'Confirm deletion' : 'Delete task'}
          >
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 backdrop-blur-sm bg-red-500/10 border border-red-400/30 rounded-xl sm:rounded-2xl animate-fade-in">
          <p className="text-sm sm:text-base text-red-200 font-medium">
            ⚠️ Click delete again to confirm
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
