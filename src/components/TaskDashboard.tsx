import React, { useState, useEffect } from 'react';
import { LogOut, Plus, Sparkles, Moon, Sun } from 'lucide-react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import SearchBar from './SearchBar';
import { Task, TaskFilter as FilterType } from '../types/task';
import { getUserTasks, saveUserTask, deleteUserTask, clearUser, clearUserTasks } from '../utils/localStorage';

interface TaskDashboardProps {
  user: string;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const TaskDashboard: React.FC<TaskDashboardProps> = ({ user, onLogout, darkMode, onToggleDarkMode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const userTasks = getUserTasks(user);
    setTasks(userTasks);
  }, [user]);

  const handleLogout = () => {
    clearUser();
    onLogout();
  };

  const addTask = (taskData: { title: string; description: string; priority: 'low' | 'medium' | 'high'; dueDate?: string; category?: string }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdAt: new Date().toISOString(),
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      category: taskData.category,
      userId: user,
    };
    saveUserTask(newTask, user);
    setTasks(prev => [newTask, ...prev]);
    setIsFormOpen(false);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    );
    setTasks(updatedTasks);
    const updatedTask = updatedTasks.find(t => t.id === id);
    if (updatedTask) {
      saveUserTask(updatedTask, user);
    }
    setEditingTask(null);
  };

  const deleteTask = (id: string) => {
    deleteUserTask(id, user);
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    const toggledTask = updatedTasks.find(t => t.id === id);
    if (toggledTask) {
      saveUserTask(toggledTask, user);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || 
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed);
    
    const matchesSearch = !searchTerm || 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.category && task.category.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10' : 'bg-white/30'} rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border ${darkMode ? 'border-white/20' : 'border-white/40'} animate-fade-in ${darkMode ? 'hover:bg-white/15' : 'hover:bg-white/40'} transition-all duration-300`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                <Sparkles className={`w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 ${darkMode ? 'text-purple-300' : 'text-blue-500'} animate-pulse transition-colors duration-500`} />
                <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r ${darkMode ? 'from-white via-purple-200 to-blue-200' : 'from-slate-800 via-blue-600 to-indigo-700'} bg-clip-text text-transparent transition-all duration-500 truncate`}>
                  Welcome, {user}!
                </h1>
              </div>
              <p className={`${darkMode ? 'text-white/80' : 'text-slate-700/90'} text-sm sm:text-base md:text-lg font-light transition-colors duration-500`}>
                {taskCounts.pending > 0 
                  ? `You have ${taskCounts.pending} pending task${taskCounts.pending === 1 ? '' : 's'} ✨`
                  : 'All caught up! Great work! 🎉✨'
                }
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto mt-4 sm:mt-0">
              <button
                onClick={onToggleDarkMode}
                className={`flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-sm ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-white/40 hover:bg-white/60'} rounded-2xl transition-all duration-300 border ${darkMode ? 'border-white/20' : 'border-white/40'} ${darkMode ? 'hover:border-white/30' : 'hover:border-white/60'} hover:scale-105 transform flex-1 sm:flex-none`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />}
                <span className="sm:sr-only">{darkMode ? 'Light' : 'Dark'} mode</span>
              </button>
              <button
                onClick={handleLogout}
                className={`flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-2 sm:py-3 ${darkMode ? 'text-white/80 hover:text-white' : 'text-slate-700/80 hover:text-slate-800'} backdrop-blur-sm ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-white/40 hover:bg-white/60'} rounded-2xl transition-all duration-300 border ${darkMode ? 'border-white/20' : 'border-white/40'} ${darkMode ? 'hover:border-white/30' : 'hover:border-white/60'} font-medium hover:scale-105 transform flex-1 sm:flex-none`}
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 sm:mb-8">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} darkMode={darkMode} />
        </div>

        {/* Task Filters */}
        <div className="mb-6 sm:mb-8 overflow-x-auto">
          <div className="w-max min-w-full">
            <TaskFilter 
              currentFilter={filter} 
              onFilterChange={setFilter}
              taskCounts={taskCounts}
              darkMode={darkMode}
            />
          </div>
        </div>

        {/* Add Task Button */}
        <div className="mb-8">
          <button
            onClick={() => setIsFormOpen(true)}
            className={`flex items-center gap-3 bg-gradient-to-r ${darkMode ? 'from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600' : 'from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'} text-white px-8 py-4 rounded-2xl font-medium focus:ring-2 ${darkMode ? 'focus:ring-purple-400/50' : 'focus:ring-blue-500/50'} focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 hover:scale-105 transform shadow-2xl hover:shadow-blue-500/25 text-lg`}
          >
            <Plus className="w-6 h-6" />
            Add New Task
            <Sparkles className="w-5 h-5 animate-pulse" />
          </button>
        </div>

        {/* Task Form Modal */}
        {(isFormOpen || editingTask) && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10' : 'bg-white/30'} rounded-3xl p-8 w-full max-w-md animate-scale-in border ${darkMode ? 'border-white/20' : 'border-white/40'} shadow-2xl max-h-[90vh] overflow-y-auto`}>
              <TaskForm
                task={editingTask}
                onSubmit={editingTask ? 
                  (data) => updateTask(editingTask.id, data) : 
                  addTask
                }
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingTask(null);
                }}
                darkMode={darkMode}
              />
            </div>
          </div>
        )}

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={toggleComplete}
          onEdit={setEditingTask}
          onDelete={deleteTask}
          darkMode={darkMode}
        />

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10' : 'bg-white/30'} rounded-3xl shadow-2xl p-12 text-center animate-fade-in border ${darkMode ? 'border-white/20' : 'border-white/40'} ${darkMode ? 'hover:bg-white/15' : 'hover:bg-white/40'} transition-all duration-300`}>
            <div className="text-6xl mb-6 animate-bounce">✨</div>
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'} mb-4 transition-colors duration-500`}>
              {searchTerm ? 'No matching tasks' : filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
            </h3>
            <p className={`${darkMode ? 'text-white/70' : 'text-slate-700/80'} mb-8 text-lg font-light transition-colors duration-500`}>
              {searchTerm 
                ? `No tasks match "${searchTerm}". Try a different search term.`
                : filter === 'all' 
                  ? 'Get started by adding your first task!'
                  : `You don't have any ${filter} tasks right now.`
              }
            </p>
            {filter === 'all' && !searchTerm && (
              <button
                onClick={() => setIsFormOpen(true)}
                className={`bg-gradient-to-r ${darkMode ? 'from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600' : 'from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'} text-white px-8 py-4 rounded-2xl transition-all duration-300 font-medium text-lg shadow-xl hover:scale-105 transform`}
              >
                Add Your First Task ✨
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDashboard;
