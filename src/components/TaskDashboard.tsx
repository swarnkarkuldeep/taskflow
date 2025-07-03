import React, { useState, useEffect } from 'react';
import { LogOut, Plus, Sparkles, Moon, Sun } from 'lucide-react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import SearchBar from './SearchBar';
import { Task, TaskFilter as FilterType } from '../types/task';
import { getTasks, saveTasks, clearUser } from '../utils/localStorage';

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
    const savedTasks = getTasks();
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

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
    };
    setTasks(prev => [newTask, ...prev]);
    setIsFormOpen(false);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
    setEditingTask(null);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
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
    <div className="min-h-screen p-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10' : 'bg-white/30'} rounded-3xl shadow-2xl p-8 mb-8 border ${darkMode ? 'border-white/20' : 'border-white/40'} animate-fade-in ${darkMode ? 'hover:bg-white/15' : 'hover:bg-white/40'} transition-all duration-300`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className={`w-8 h-8 ${darkMode ? 'text-purple-300' : 'text-blue-500'} animate-pulse transition-colors duration-500`} />
                <h1 className={`text-4xl font-bold bg-gradient-to-r ${darkMode ? 'from-white via-purple-200 to-blue-200' : 'from-slate-800 via-blue-600 to-indigo-700'} bg-clip-text text-transparent transition-all duration-500`}>
                  Welcome back, {user}!
                </h1>
              </div>
              <p className={`${darkMode ? 'text-white/80' : 'text-slate-700/90'} text-lg font-light transition-colors duration-500`}>
                {taskCounts.pending > 0 
                  ? `You have ${taskCounts.pending} pending task${taskCounts.pending === 1 ? '' : 's'} ✨`
                  : 'All caught up! Great work! 🎉✨'
                }
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onToggleDarkMode}
                className={`flex items-center gap-2 px-4 py-3 backdrop-blur-sm ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-white/40 hover:bg-white/60'} rounded-2xl transition-all duration-300 border ${darkMode ? 'border-white/20' : 'border-white/40'} ${darkMode ? 'hover:border-white/30' : 'hover:border-white/60'} hover:scale-105 transform`}
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </button>
              <button
                onClick={handleLogout}
                className={`flex items-center gap-2 px-6 py-3 ${darkMode ? 'text-white/80 hover:text-white' : 'text-slate-700/80 hover:text-slate-800'} backdrop-blur-sm ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-white/40 hover:bg-white/60'} rounded-2xl transition-all duration-300 border ${darkMode ? 'border-white/20' : 'border-white/40'} ${darkMode ? 'hover:border-white/30' : 'hover:border-white/60'} font-medium hover:scale-105 transform`}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} darkMode={darkMode} />
        </div>

        {/* Task Filters */}
        <div className="mb-8">
          <TaskFilter 
            currentFilter={filter} 
            onFilterChange={setFilter}
            taskCounts={taskCounts}
            darkMode={darkMode}
          />
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
