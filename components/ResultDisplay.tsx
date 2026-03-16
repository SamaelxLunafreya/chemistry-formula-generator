import React from 'react';
import type { SynthesisInstruction } from '../types';

interface ResultDisplayProps {
  data: SynthesisInstruction;
}

const Section: React.FC<{ title: string; icon: string; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg">
      <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center">
        <i className={`fas ${icon} mr-3`}></i>
        {title}
      </h3>
      <div className="prose prose-invert max-w-none text-gray-300">
          {children}
      </div>
    </div>
);


const ResultDisplay: React.FC<ResultDisplayProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <header className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h2 className="text-3xl font-extrabold text-white">Procedura Syntezy: {data.compoundName}</h2>
        <p className="mt-2 text-gray-400">{data.introduction}</p>
      </header>

      <Section title="Kluczowe Ostrzeżenia Bezpieczeństwa" icon="fa-triangle-exclamation">
        <ul className="space-y-2">
          {data.safetyWarnings.map((warning, index) => (
            <li key={index} className="flex items-start">
              <i className="fas fa-shield-halved text-yellow-400 mt-1 mr-3"></i>
              <span>{warning}</span>
            </li>
          ))}
        </ul>
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Section title="Wymagane Odczynniki" icon="fa-prescription-bottle">
          <ul className="space-y-2">
            {data.requiredReagents.map((reagent, index) => (
              <li key={index} className="flex justify-between">
                <span>{reagent.name}</span>
                <span className="font-mono text-gray-400">{reagent.quantity}</span>
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Wymagany Sprzęt" icon="fa-microscope">
          <ul className="space-y-2 list-disc list-inside">
            {data.requiredEquipment.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Section>
      </div>

      <Section title="Procedura Krok po Kroku" icon="fa-list-ol">
        <ol className="space-y-6">
          {data.procedure.map((step) => (
            <li key={step.step} className="flex items-start">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-800 text-cyan-200 font-bold mr-4 flex-shrink-0 mt-1">{step.step}</span>
              <div className="flex-grow">
                <p>{step.description}</p>
                {step.explanation && (
                    <div className="mt-3 p-3 bg-gray-900/50 border-l-4 border-cyan-600 rounded-r-lg">
                        <p className="text-sm text-gray-400">
                            <i className="fas fa-info-circle mr-2 text-cyan-400"></i>
                            <strong>Wyjaśnienie:</strong> {step.explanation}
                        </p>
                    </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
};

export default ResultDisplay;