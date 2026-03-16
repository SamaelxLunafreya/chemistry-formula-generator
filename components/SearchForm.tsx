
import React, { useState } from 'react';

interface SearchFormProps {
  onGenerate: (compoundName: string) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onGenerate, isLoading }) => {
  const [compoundName, setCompoundName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(compoundName);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
      <div className="relative w-full">
          <i className="fas fa-atom absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            value={compoundName}
            onChange={(e) => setCompoundName(e.target.value)}
            placeholder="Wpisz nazwę związku chemicznego, np. 'Aspiryna'"
            disabled={isLoading}
            className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
          />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generowanie...
          </>
        ) : (
          <>
            <i className="fas fa-cogs"></i>
            Generuj Instrukcję
          </>
        )}
      </button>
    </form>
  );
};

export default SearchForm;
