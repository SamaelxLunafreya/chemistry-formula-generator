
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center border-b-2 border-cyan-500 pb-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
        <i className="fas fa-flask-vial mr-3 text-cyan-400"></i>
        Generator Instrukcji Chemicznych
      </h1>
      <p className="mt-3 text-lg text-gray-400">
        Twój asystent AI do tworzenia szczegółowych procedur syntezy chemicznej.
      </p>
    </header>
  );
};

export default Header;
