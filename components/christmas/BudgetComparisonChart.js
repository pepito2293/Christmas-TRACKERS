import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BudgetComparisonChart({ totalBudgetise, totalDepense, budgetTotal, devise, theme }) {
  const reste = budgetTotal - totalDepense;
  
  const data = [
    {
      name: 'Budget',
      'Budget Total': budgetTotal,
      'Budgétisé': totalBudgetise,
      'Dépensé': totalDepense,
      'Reste': reste > 0 ? reste : 0
    }
  ];

  return (
    <div className="rounded-lg h-full flex flex-col" style={{ backgroundColor: theme.secondary }}>
      <div className="px-4 py-3">
        <h3 className="text-white font-bold text-center">Comparaison Budget</h3>
      </div>
      <div className="flex-1 px-4 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 10, left: 10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff40" />
            <XAxis dataKey="name" tick={{ fill: '#fff', fontSize: 12 }} />
            <YAxis tick={{ fill: '#fff', fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme.primaryDark,
                border: `1px solid ${theme.primary}`,
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value) => `${value.toFixed(2)} ${devise}`}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Bar dataKey="Budget Total" fill="#4a90e2" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Budgétisé" fill={theme.accent} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Dépensé" fill="#ff6b6b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Reste" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
