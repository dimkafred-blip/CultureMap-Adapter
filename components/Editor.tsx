
import React from 'react';
import { AppMode } from '../types';

interface EditorProps {
  value: string;
  onChange: (val: string) => void;
  onAdapt: () => void;
  loading: boolean;
  target: string;
  mode: AppMode;
  onToggleMode: (mode: AppMode) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange, onAdapt, loading, target, mode, onToggleMode }) => {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">
          {mode === 'adapt' ? 'Source English Text' : 'Cultural Consultation'}
        </h2>
        
        {/* Toggle Tumbler */}
        <div className="flex items-center gap-3">
          <span className={`text-[10px] font-bold uppercase transition-colors ${mode === 'adapt' ? 'text-indigo-600' : 'text-slate-400'}`}>Adapt</span>
          <button 
            onClick={() => onToggleMode(mode === 'adapt' ? 'ask' : 'adapt')}
            className="relative w-10 h-5 bg-slate-200 rounded-full transition-colors focus:outline-none"
            aria-label="Toggle Mode"
          >
            <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-200 transform ${mode === 'ask' ? 'translate-x-5 bg-indigo-600' : ''}`} 
                 style={{ backgroundColor: mode === 'ask' ? '#4f46e5' : 'white' }}
            />
          </button>
          <span className={`text-[10px] font-bold uppercase transition-colors ${mode === 'ask' ? 'text-indigo-600' : 'text-slate-400'}`}>Ask AI</span>
        </div>
      </div>
      
      <div className="p-6">
        <textarea
          className="w-full h-48 p-4 text-slate-700 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none font-medium placeholder:text-slate-300"
          placeholder={mode === 'adapt' 
            ? "Paste your business email, feedback, or proposal here (in English)..." 
            : `Ask a question about interacting with ${target} people...`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-slate-400 max-w-sm">
            {mode === 'adapt' 
              ? `AI will rewrite this text for ${target} cultural norms.` 
              : `Gemini will provide expert advice for ${target} based on Erin Meyer's principles.`}
          </p>
          <button
            onClick={onAdapt}
            disabled={loading || !value.trim()}
            className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            {loading ? 'Consulting...' : (mode === 'adapt' ? `Adapt for ${target}` : `Ask Expert`)}
            {!loading && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Editor;
