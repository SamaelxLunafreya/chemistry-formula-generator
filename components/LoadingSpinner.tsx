
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-12 text-center">
        <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-gray-700 border-b-transparent rounded-full animate-spin-reverse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-flask text-3xl text-cyan-400"></i>
            </div>
        </div>
      <p className="mt-4 text-lg text-gray-400 font-semibold">
        Analizowanie struktury i generowanie procedury...
      </p>
      <p className="text-sm text-gray-500">To może zająć chwilę.</p>
    </div>
  );
};

// Dodajmy animację do globalnego stylu, jeśli to możliwe, lub użyjmy inline, jeśli nie.
// W tym przypadku Tailwind załatwia sprawę z `animate-spin`.
// Dodajmy niestandardową animację dla `animate-spin-reverse` w index.html lub konfiguracji tailwind.
// Dla prostoty, tutaj użyjemy po prostu podwójnego spinu.
// W prawdziwym projekcie dodałbym to do `tailwind.config.js`.
const style = `
@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
.animate-spin-reverse {
  animation: spin-reverse 1s linear infinite;
}
`;

// Wstrzyknij style do nagłówka dokumentu
const styleSheet = document.createElement("style");
styleSheet.innerText = style;
document.head.appendChild(styleSheet);


export default LoadingSpinner;
