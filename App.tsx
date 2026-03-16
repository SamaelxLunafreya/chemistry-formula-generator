
import React, { useState, useCallback } from 'react';
import type { SynthesisInstruction } from './types';
import { generateSynthesisInstructions } from './services/geminiService';
import Header from './components/Header';
import SafetyDisclaimer from './components/SafetyDisclaimer';
import SearchForm from './components/SearchForm';
import LoadingSpinner from './components/LoadingSpinner';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [synthesisResult, setSynthesisResult] = useState<SynthesisInstruction | null>(null);

  const handleGenerate = useCallback(async (compoundName: string) => {
    if (!compoundName.trim()) {
      setError("Proszę podać nazwę związku chemicznego.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSynthesisResult(null);

    try {
      const result = await generateSynthesisInstructions(compoundName);
      setSynthesisResult(result);
    } catch (err) {
      console.error(err);
      setError("Nie udało się wygenerować instrukcji. Sprawdź konsolę, aby uzyskać więcej informacji lub spróbuj ponownie później.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <SafetyDisclaimer />
        <main className="mt-8">
          <SearchForm onGenerate={handleGenerate} isLoading={isLoading} />
          {error && (
            <div className="mt-6 bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg shadow-lg animate-pulse" role="alert">
              <strong className="font-bold">Błąd: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {isLoading && <LoadingSpinner />}
          {synthesisResult && !isLoading && (
            <div className="mt-8 animate-fade-in">
              <ResultDisplay data={synthesisResult} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
