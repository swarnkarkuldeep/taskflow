
import React, { useState, useEffect } from 'react';
import Login from '../components/Login';
import TaskDashboard from '../components/TaskDashboard';
import { getUser } from '../utils/localStorage';

const Index = () => {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedUser = getUser();
    const savedDarkMode = localStorage.getItem('taskflow_darkmode') === 'true';
    setUser(savedUser);
    setDarkMode(savedDarkMode);
    setIsLoading(false);
  }, []);

  const handleLogin = (username: string) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('taskflow_darkmode', newDarkMode.toString());
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'} flex items-center justify-center relative overflow-hidden`}>
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${darkMode ? 'bg-purple-500/20' : 'bg-blue-400/20'} rounded-full blur-3xl animate-pulse`}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${darkMode ? 'bg-blue-500/20' : 'bg-indigo-400/20'} rounded-full blur-3xl animate-pulse animation-delay-1000`}></div>
          <div className={`absolute top-3/4 left-3/4 w-64 h-64 ${darkMode ? 'bg-indigo-500/20' : 'bg-purple-400/20'} rounded-full blur-3xl animate-pulse animation-delay-2000`}></div>
        </div>
        
        <div className="backdrop-blur-sm bg-white/20 rounded-3xl p-8 border border-white/30 shadow-2xl">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-white/30 border-t-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'} relative overflow-hidden transition-all duration-500`}>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${darkMode ? 'bg-purple-500/20' : 'bg-blue-400/20'} rounded-full blur-3xl animate-pulse transition-colors duration-500`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${darkMode ? 'bg-blue-500/20' : 'bg-indigo-400/20'} rounded-full blur-3xl animate-pulse animation-delay-1000 transition-colors duration-500`}></div>
        <div className={`absolute top-3/4 left-3/4 w-64 h-64 ${darkMode ? 'bg-indigo-500/20' : 'bg-purple-400/20'} rounded-full blur-3xl animate-pulse animation-delay-2000 transition-colors duration-500`}></div>
        <div className={`absolute top-1/2 left-1/2 w-32 h-32 ${darkMode ? 'bg-pink-500/20' : 'bg-rose-400/20'} rounded-full blur-2xl animate-bounce transition-colors duration-500`}></div>
      </div>
      
      {user ? (
        <TaskDashboard user={user} onLogout={handleLogout} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      ) : (
        <Login onLogin={handleLogin} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      )}
    </div>
  );
};

export default Index;
