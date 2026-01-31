
import React, { useState } from 'react';
import { TargetCulture, TransformationResult, AppMode } from './types';
import { CULTURE_PROFILES } from './constants';
import { processRequest } from './services/gemini';
import Header from './components/Header';
import Editor from './components/Editor';
import CultureCard from './components/CultureCard';
import ComparisonView from './components/ComparisonView';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [targetCulture, setTargetCulture] = useState<TargetCulture>('France');
  const [mode, setMode] = useState<AppMode>('adapt');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TransformationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await processRequest(inputText, targetCulture, mode);
      setResult(data);
    } catch (err) {
      setError("Failed to reach Gemini. Please check your network or API key.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMode = (newMode: AppMode) => {
    setMode(newMode);
    // Optional: Clear results when switching modes for clarity
    // setResult(null); 
  };

  return (
    <div className="min-h-screen pb-12">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Input & Target Selection */}
          <div className="lg:col-span-1 space-y-6">
            <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold mb-4 text-slate-800">1. Target Audience</h2>
              <div className="space-y-3">
                {(Object.keys(CULTURE_PROFILES) as TargetCulture[]).map((culture) => (
                  <button
                    key={culture}
                    onClick={() => setTargetCulture(culture)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      targetCulture === culture 
                      ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-100' 
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{CULTURE_PROFILES[culture].flag}</span>
                      <div>
                        <div className="font-semibold text-slate-900">{culture}</div>
                        <div className="text-xs text-slate-500 line-clamp-1">
                          {CULTURE_PROFILES[culture].summary}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <CultureCard profile={CULTURE_PROFILES[targetCulture]} />
          </div>

          {/* Right Column: Editor & Results */}
          <div className="lg:col-span-2 space-y-6">
            <Editor 
              value={inputText} 
              onChange={setInputText} 
              onAdapt={handleProcess} 
              loading={loading}
              target={targetCulture}
              mode={mode}
              onToggleMode={handleToggleMode}
            />

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {result && !loading && (
              <ComparisonView result={result} />
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center p-20 bg-white rounded-xl border border-slate-100 shadow-sm animate-pulse">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium">
                  {mode === 'adapt' ? 'Analyzing cultural nuances...' : 'Consulting cultural maps...'}
                </p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
