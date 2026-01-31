
import React from 'react';
import { TransformationResult } from '../types';

interface ComparisonViewProps {
  result: TransformationResult;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ result }) => {
  const isAskMode = result.mode === 'ask';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original Input/Question */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {isAskMode ? 'Your Question' : 'Raw Input'}
            </span>
          </div>
          <div className="p-4 text-sm text-slate-500 whitespace-pre-wrap leading-relaxed">
            {result.originalText}
          </div>
        </div>

        {/* Adapted Output/Answer */}
        <div className="bg-white rounded-xl shadow-lg border border-indigo-100 overflow-hidden ring-1 ring-indigo-50">
          <div className="bg-indigo-50 px-4 py-2 border-b border-indigo-100 flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">
              {isAskMode ? 'Expert Answer' : `Adapted for ${result.target}`}
            </span>
            <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded uppercase font-black">
              {isAskMode ? 'Consultation' : 'Optimized'}
            </span>
          </div>
          <div className={`p-4 text-sm whitespace-pre-wrap leading-relaxed ${isAskMode ? 'text-slate-700 bg-white' : 'text-slate-800 font-medium'}`}>
            {result.adaptedText}
          </div>
        </div>
      </div>

      {/* Rationale & Analysis */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">
            {isAskMode ? 'Framework Mapping' : 'Cultural Transformation Logic'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.analysis.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-100 group hover:border-indigo-200 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600">{item.scale}</h4>
              </div>
              <p className="text-sm text-slate-600 leading-snug">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <p className="text-sm text-slate-500 italic">
            <strong>{isAskMode ? 'Conclusion:' : 'Key Transformation Summary:'}</strong> {result.explanation}
          </p>
        </div>
      </section>
    </div>
  );
};

export default ComparisonView;
