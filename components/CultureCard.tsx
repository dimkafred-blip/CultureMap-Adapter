
import React from 'react';
import { CultureProfile } from '../types';

interface CultureCardProps {
  profile: CultureProfile;
}

const CultureCard: React.FC<CultureCardProps> = ({ profile }) => {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-indigo-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl drop-shadow-sm">{profile.flag}</span>
          <h2 className="text-xl font-bold text-white tracking-tight">{profile.name} Mentality</h2>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <p className="text-sm text-slate-600 leading-relaxed italic border-l-4 border-indigo-100 pl-4 py-1">
          "{profile.summary}"
        </p>
        
        <div className="space-y-4 pt-2">
          <ScaleItem label="Persuading" value={profile.persuading} />
          <ScaleItem label="Evaluating" value={profile.evaluating} />
          <ScaleItem label="Leading" value={profile.leading} />
          <ScaleItem label="Trusting" value={profile.trusting} />
        </div>
      </div>
    </section>
  );
};

const ScaleItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="group">
    <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-0.5">{label}</div>
    <div className="text-sm font-medium text-slate-800 group-hover:text-indigo-600 transition-colors">{value}</div>
  </div>
);

export default CultureCard;
