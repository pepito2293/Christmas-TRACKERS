import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Edit2, Check, X } from 'lucide-react';

export default function BudgetSection({ budget, onUpdate, totalDepense, totalBudgetise, theme }) {
  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    devise: budget?.devise || '€',
    budget_total: budget?.budget_total || 0
  });

  const handleSave = () => {
    onUpdate(editValues);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditValues({
      devise: budget?.devise || '€',
      budget_total: budget?.budget_total || 0
    });
    setEditing(false);
  };

  const devise = budget?.devise || '€';
  const budgetTotal = budget?.budget_total || 0;
  const reste = budgetTotal - totalDepense;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {/* Devise */}
      <div className="rounded-lg px-4 py-4 flex flex-col items-center justify-center" style={{ backgroundColor: theme.primary }}>
        <span className="text-white font-semibold text-sm mb-2">DEVISE</span>
        {editing ? (
          <Input
            value={editValues.devise}
            onChange={(e) => setEditValues({ ...editValues, devise: e.target.value })}
            className="w-20 h-10 text-center bg-white"
          />
        ) : (
          <span className="text-white font-bold text-2xl">{devise}</span>
        )}
      </div>

      {/* Budget Total */}
      <div className="rounded-lg px-4 py-4 flex flex-col items-center justify-center" style={{ backgroundColor: theme.primary }}>
        <span className="text-white font-semibold text-sm mb-2 text-center">BUDGET TOTAL</span>
        {editing ? (
          <Input
            type="number"
            value={editValues.budget_total}
            onChange={(e) => setEditValues({ ...editValues, budget_total: e.target.value === '' ? '' : parseFloat(e.target.value) || 0 })}
            className="w-28 h-10 text-center bg-white"
          />
        ) : (
          <span className="text-white font-bold text-2xl">{budgetTotal.toFixed(2)} {devise}</span>
        )}
      </div>

      {/* Dépensé Budgétisé */}
      <div className="rounded-lg px-4 py-4 flex flex-col items-center justify-center" style={{ backgroundColor: theme.primary }}>
        <span className="text-white font-semibold text-sm mb-2 text-center">DÉPENSÉ BUDGÉTISÉ</span>
        <span className="text-white font-bold text-2xl">{totalBudgetise.toFixed(2)} {devise}</span>
      </div>

      {/* Dépense Réel */}
      <div className="rounded-lg px-4 py-4 flex flex-col items-center justify-center" style={{ backgroundColor: theme.primary }}>
        <span className="text-white font-semibold text-sm mb-2 text-center">DÉPENSE RÉEL</span>
        <span className="text-white font-bold text-2xl">{totalDepense.toFixed(2)} {devise}</span>
      </div>

      {/* Reste à Dépenser */}
      <div className="rounded-lg px-4 py-4 flex flex-col items-center justify-center" style={{ backgroundColor: theme.primary }}>
        <span className="text-white font-semibold text-sm mb-2 text-center">RESTE À DÉPENSER</span>
        <span className={`font-bold text-2xl ${reste < 0 ? 'text-red-200' : 'text-white'}`}>
          {reste.toFixed(2)} {devise}
        </span>
      </div>

      {/* Edit Button - spans all columns */}
      <div className="col-span-2 md:col-span-5 flex justify-center gap-2">
        {editing ? (
          <>
            <Button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white h-10 px-6"
              size="sm"
            >
              <Check className="w-4 h-4 mr-1" /> Sauvegarder
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="h-10 px-6"
              size="sm"
            >
              <X className="w-4 h-4 mr-1" /> Annuler
            </Button>
          </>
        ) : (
          <Button
            onClick={() => setEditing(true)}
            className="text-white h-10 px-6"
            style={{ backgroundColor: theme.primary }}
            size="sm"
          >
            <Edit2 className="w-4 h-4 mr-1" /> Modifier le budget
          </Button>
        )}
      </div>
    </div>
  );
}
