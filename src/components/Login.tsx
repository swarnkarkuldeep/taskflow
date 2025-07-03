
import React, { useState } from 'react';
import { User, ArrowRight, Sparkles, Moon, Sun } from 'lucide-react';
import { saveUser } from '../utils/localStorage';

interface LoginProps {
  onLogin: (username: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, darkMode, onToggleDarkMode }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        saveUser(username.trim());
        onLogin(username.trim());
        setIsLoading(false);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      {/* Dark mode toggle */}
      <button
        onClick={onToggleDarkMode}
        className={`fixed top-6 right-6 p-3 backdrop-blur-xl ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-white/40 hover:bg-white/60'} rounded-2xl border ${darkMode ? 'border-white/20' : 'border-white/40'} transition-all duration-300 hover:scale-110 transform z-10`}
      >
        {darkMode ? <Sun className="w-6 h-6 text-yellow-300" /> : <Moon className="w-6 h-6 text-slate-600" />}
      </button>

      <div className="max-w-md w-full">
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10' : 'bg-white/30'} rounded-3xl shadow-2xl p-8 border ${darkMode ? 'border-white/20' : 'border-white/40'} animate-fade-in ${darkMode ? 'hover:bg-white/15' : 'hover:bg-white/40'} transition-all duration-500`}>
          <div className="text-center mb-8">
            <div className={`mx-auto w-20 h-20 bg-gradient-to-br ${darkMode ? 'from-purple-400 to-blue-400' : 'from-blue-500 to-indigo-600'} rounded-full flex items-center justify-center mb-6 shadow-2xl backdrop-blur-sm border ${darkMode ? 'border-white/30' : 'border-white/50'} transition-all duration-500`}>
              <User className="w-10 h-10 text-white drop-shadow-lg" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className={`w-6 h-6 ${darkMode ? 'text-purple-300' : 'text-blue-500'} animate-pulse transition-colors duration-500`} />
              <h1 className={`text-4xl font-bold bg-gradient-to-r ${darkMode ? 'from-white via-purple-200 to-blue-200' : 'from-slate-800 via-blue-600 to-indigo-700'} bg-clip-text text-transparent transition-all duration-500`}>
                TaskFlow
              </h1>
              <Sparkles className={`w-6 h-6 ${darkMode ? 'text-blue-300' : 'text-indigo-500'} animate-pulse animation-delay-500 transition-colors duration-500`} />
            </div>
            <p className={`${darkMode ? 'text-white/80' : 'text-slate-700/90'} text-lg font-light transition-colors duration-500`}>Your personal task management companion</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className={`block text-sm font-medium ${darkMode ? 'text-white/90' : 'text-slate-800/90'} mb-3 transition-colors duration-500`}>
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-4 backdrop-blur-sm ${darkMode ? 'bg-white/10 text-white placeholder-white/50' : 'bg-white/40 text-slate-800 placeholder-slate-500/70'} border ${darkMode ? 'border-white/20' : 'border-white/40'} rounded-2xl focus:ring-2 ${darkMode ? 'focus:ring-purple-400/50 focus:border-purple-400/50' : 'focus:ring-blue-500/50 focus:border-blue-500/50'} ${darkMode ? 'focus:bg-white/15' : 'focus:bg-white/50'} transition-all duration-300 text-lg`}
                placeholder="Enter your username"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!username.trim() || isLoading}
              className={`w-full bg-gradient-to-r ${darkMode ? 'from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600' : 'from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'} text-white py-4 px-6 rounded-2xl font-medium focus:ring-2 ${darkMode ? 'focus:ring-purple-400/50' : 'focus:ring-blue-500/50'} focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <div className={`backdrop-blur-sm ${darkMode ? 'bg-white/5' : 'bg-white/20'} rounded-2xl p-4 border ${darkMode ? 'border-white/10' : 'border-white/30'}`}>
              <p className={`${darkMode ? 'text-white/70' : 'text-slate-700/80'} text-sm font-light transition-colors duration-500`}>
                ✨ No registration required. Just enter any username to begin!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
