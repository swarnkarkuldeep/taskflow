
import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  darkMode: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, darkMode }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className={`w-5 h-5 ${darkMode ? 'text-white/60' : 'text-slate-600/70'} transition-colors duration-300`} />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
        className={`w-full pl-12 pr-12 py-4 backdrop-blur-xl ${darkMode ? 'bg-white/10 text-white placeholder-white/50' : 'bg-white/30 text-slate-800 placeholder-slate-600/70'} border ${darkMode ? 'border-white/20' : 'border-white/40'} rounded-2xl focus:ring-2 ${darkMode ? 'focus:ring-purple-400/50 focus:border-purple-400/50' : 'focus:ring-blue-500/50 focus:border-blue-500/50'} ${darkMode ? 'focus:bg-white/15' : 'focus:bg-white/40'} transition-all duration-300 text-lg ${darkMode ? 'hover:bg-white/15' : 'hover:bg-white/40'}`}
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transform transition-all duration-200"
        >
          <X className={`w-5 h-5 ${darkMode ? 'text-white/60 hover:text-white' : 'text-slate-600/70 hover:text-slate-800'} transition-colors duration-200`} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
