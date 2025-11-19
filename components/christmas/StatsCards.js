import React from 'react';

export default function StatsCards({ gifts, theme }) {
  const total = gifts.length;
  const achetes = gifts.filter(g => g.achete).length;
  const emballes = gifts.filter(g => g.emballe).length;
  const donnes = gifts.filter(g => g.donne).length;

  const percentAchetes = total > 0 ? Math.round((achetes / total) * 100) : 0;
  const percentEmballes = total > 0 ? Math.round((emballes / total) * 100) : 0;
  const percentDonnes = total > 0 ? Math.round((donnes / total) * 100) : 0;

  const StatCard = ({ title, percent, count, total }) => (
    <div className="rounded-lg p-4 flex flex-col items-center justify-center" style={{ backgroundColor: theme.primary }}>
      <h3 className="text-white font-bold text-center text-xs mb-3">{title}</h3>
      <div className="relative w-20 h-20 mb-2">
        <svg className="transform -rotate-90 w-20 h-20">
          <circle
            cx="40"
            cy="40"
            r="34"
            stroke="#ffffff"
            strokeWidth="7"
            fill="none"
            opacity="0.3"
          />
          <circle
            cx="40"
            cy="40"
            r="34"
            stroke="#ffffff"
            strokeWidth="7"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 34}`}
            strokeDashoffset={`${2 * Math.PI * 34 * (1 - percent / 100)}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-white">{percent}%</span>
        </div>
      </div>
      <p className="text-white text-sm font-medium text-center">
        {count}/{total}
      </p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard 
        title="CADEAUX ACHETÉS" 
        percent={percentAchetes} 
        count={achetes} 
        total={total}
      />
      <StatCard 
        title="CADEAUX EMBALLÉS" 
        percent={percentEmballes} 
        count={emballes} 
        total={total}
      />
      <StatCard 
        title="CADEAUX DONNÉS" 
        percent={percentDonnes} 
        count={donnes} 
        total={total}
      />
    </div>
  );
}
