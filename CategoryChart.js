import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CATEGORIES = ["Familles", "Amis", "Couple", "Bons voisins", "Voisins", "Collègues", "Animaux", "Moi", "Autres"];

export default function CategoryChart({ gifts, devise }) {
  const data = CATEGORIES.map(cat => {
    const categoryGifts = gifts.filter(g => g.categorie === cat);
    const total = categoryGifts.reduce((sum, g) => sum + (g.prix_depense || 0), 0);
    const budgeted = categoryGifts.reduce((sum, g) => sum + (g.prix_budgete || 0), 0);
    
    return {
      name: cat.length > 8 ? cat.substring(0, 8) + '...' : cat,
      fullName: cat,
      'Dépensé': total,
      'Budgété': budgeted
    };
  });

  return (
    <div className="bg-[#1a4d2e] rounded-lg p-4 h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3d7f4f" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fill: '#fff', fontSize: 11 }}
          />
          <YAxis tick={{ fill: '#fff', fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#2d5f3f', 
              border: '1px solid #c63b3b',
              borderRadius: '8px',
              color: '#fff'
            }}
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                return payload[0].payload.fullName;
              }
              return label;
            }}
            formatter={(value) => `${value.toFixed(2)} ${devise}`}
          />
          <Bar dataKey="Budgété" fill="#ffc5c5" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Dépensé" fill="#c63b3b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
