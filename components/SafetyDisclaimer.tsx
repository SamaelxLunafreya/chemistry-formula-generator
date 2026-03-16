
import React from 'react';

const SafetyDisclaimer: React.FC = () => {
  return (
    <div className="mt-8 p-4 bg-yellow-900/50 border-2 border-yellow-600 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-yellow-300 flex items-center">
        <i className="fas fa-biohazard fa-lg mr-3 animate-pulse"></i>
        BARDZO WAŻNE OSTRZEŻENIE DOTYCZĄCE BEZPIECZEŃSTWA
      </h2>
      <div className="mt-2 text-yellow-200 space-y-2">
        <p>
          Informacje generowane przez tę aplikację są przeznaczone <strong>wyłącznie do celów edukacyjnych i teoretycznych</strong>. Synteza chemiczna jest procesem potencjalnie bardzo niebezpiecznym.
        </p>
        <p>
          <strong>NIGDY NIE PODEJMUJ PRÓB</strong> przeprowadzania jakichkolwiek eksperymentów chemicznych bez odpowiedniego przeszkolenia, profesjonalnego nadzoru, właściwego sprzętu laboratoryjnego (w tym wyciągu) oraz środków ochrony osobistej (okulary, rękawice, fartuch).
        </p>
        <p>
          Twórcy tej aplikacji nie ponoszą żadnej odpowiedzialności za szkody materialne, obrażenia ciała lub inne negatywne konsekwencje wynikające z wykorzystania lub próby wykorzystania przedstawionych informacji. <strong>Zawsze postępuj zgodnie z prawem i zasadami bezpieczeństwa.</strong>
        </p>
      </div>
    </div>
  );
};

export default SafetyDisclaimer;
