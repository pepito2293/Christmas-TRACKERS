import React from 'react';

const CATEGORIES = [
  "Familles", "Amis", "Couple", "Bons voisins", 
  "Voisins", "Collègues", "Animaux", "Moi", "Autres"
];

export default function CategoryTable({ gifts, devise, theme }) {
  const getCategoryData = (category) => {
    const categoryGifts = gifts.filter(g => g.categorie === category);
    const total = categoryGifts.reduce((sum, g) => sum + (g.prix_depense || 0), 0);
    return {
      count: categoryGifts.length,
      total
    };
  };

  return (
    <div className="rounded-lg overflow-hidden h-full flex flex-col" style={{ backgroundColor: theme.primary }}>
      <div className="px-4 py-3" style={{ backgroundColor: theme.primaryDark }}>
        <h3 className="text-white font-bold text-center">Catégorie</h3>
      </div>
      <div className="overflow-y-auto flex-1" style={{ maxHeight: '280px' }}>
        <div className="divide-y" style={{ borderColor: theme.primaryDark }}>
          {CATEGORIES.map((category, index) => {
            const data = getCategoryData(category);
            return (
              <div 
                key={category}
                className="px-4 py-2.5 flex items-center"
                style={{ backgroundColor: index % 2 === 0 ? theme.accent : theme.accentDark }}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-gray-800 text-sm">{category}</span>
                  <div className="text-right">
                    <div className="text-xs text-gray-600">{data.count} cadeau{data.count !== 1 ? 'x' : ''}</div>
                    <div className="text-sm font-semibold text-gray-800">{data.total.toFixed(2)} {devise}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
