import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import ChristmasDecoration from '../components/ChristmasDecoration';
import ChristmasWreath from '../components/christmas/ChristmasWreath';
import BudgetSection from '../components/christmas/BudgetSection';
import CategoryChart from '../components/christmas/CategoryChart';
import BudgetComparisonChart from '../components/christmas/BudgetComparisonChart';
import CategoryTable from '../components/christmas/CategoryTable';
import StatsCards from '../components/christmas/StatsCards';
import GiftTable from '../components/christmas/GiftTable';
import AddGiftForm from '../components/christmas/AddGiftForm';
import ThemeSelector, { THEMES } from '../components/christmas/ThemeSelector';

export default function NoelTracker() {
  const queryClient = useQueryClient();
  const [daysUntilChristmas, setDaysUntilChristmas] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('classic');
  const [christmasDate, setChristmasDate] = useState('2025-12-25');
  const [editingDate, setEditingDate] = useState(false);

  const theme = THEMES[currentTheme];

  // Fetch current user
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => base44.auth.me()
  });

  // Fetch gifts for current user only
  const { data: gifts = [], isLoading: giftsLoading } = useQuery({
    queryKey: ['gifts', user?.email],
    queryFn: () => base44.entities.Gift.filter({ created_by: user.email }, '-created_date'),
    initialData: [],
    enabled: !!user
  });

  // Fetch budget for current user only
  const { data: budgets = [] } = useQuery({
    queryKey: ['budgets', user?.email],
    queryFn: () => base44.entities.Budget.filter({ created_by: user.email }),
    initialData: [],
    enabled: !!user
  });

  const budget = budgets[0];

  // Mutations
  const createGiftMutation = useMutation({
    mutationFn: (data) => base44.entities.Gift.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gifts'] });
      setShowAddForm(false);
    }
  });

  const updateGiftMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Gift.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gifts'] })
  });

  const deleteGiftMutation = useMutation({
    mutationFn: (id) => base44.entities.Gift.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gifts'] })
  });

  const updateBudgetMutation = useMutation({
    mutationFn: async (data) => {
      if (budget?.id) {
        return base44.entities.Budget.update(budget.id, data);
      } else {
        return base44.entities.Budget.create(data);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['budgets'] })
  });

  // Calculate days until Christmas
  useEffect(() => {
    const calculateDays = () => {
      const today = new Date();
      const christmas = new Date(christmasDate);
      const diffTime = christmas - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysUntilChristmas(diffDays);
    };
    calculateDays();
  }, [christmasDate]);

  // Calculate totals
  const totalDepense = gifts.reduce((sum, g) => sum + (g.prix_depense || 0), 0);
  const totalBudgetise = gifts.reduce((sum, g) => sum + (g.prix_budgete || 0), 0);
  const devise = budget?.devise || '€';
  const budgetTotal = budget?.budget_total || 0;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-green-50">
        <div className="text-center">
          <div className="text-4xl mb-4">🎄</div>
          <p className="text-xl text-gray-700">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: theme.background }}>
      <ChristmasDecoration />
      
      <div className="container mx-auto px-4 py-6 pt-14 max-w-[1800px]">
        {/* Header - Réorganisé */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center mb-6">
          {/* Logo */}
          <div className="lg:col-span-2 flex justify-center lg:justify-start">
            <ChristmasWreath />
          </div>

          {/* Date et Compte à rebours */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="rounded-lg px-5 py-2.5 shadow-lg" style={{ backgroundColor: theme.primary }}>
              <h2 className="text-white font-bold text-sm text-center mb-1">DATE DE NOËL</h2>
              {editingDate ? (
                <div className="flex gap-2 items-center">
                  <Input
                    type="date"
                    value={christmasDate}
                    onChange={(e) => setChristmasDate(e.target.value)}
                    className="h-8 text-sm w-36"
                  />
                  <Button
                    size="sm"
                    onClick={() => setEditingDate(false)}
                    className="h-8 bg-green-600 hover:bg-green-700"
                  >
                    OK
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2 items-center justify-center">
                  <p className="text-white text-lg font-bold">
                    {new Date(christmasDate).toLocaleDateString('fr-FR')}
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingDate(true)}
                    className="h-6 w-6 p-0 text-white hover:bg-white/20"
                  >
                    ✏️
                  </Button>
                </div>
              )}
            </div>
            <div className="rounded-lg px-5 py-2.5 shadow-lg" style={{ backgroundColor: theme.secondary }}>
              <p className="text-white font-bold text-base text-center whitespace-nowrap">
                🎄 {daysUntilChristmas} JOURS AVANT NOËL! 🎄
              </p>
            </div>
          </div>

          {/* Nombre de cadeaux et bouton */}
          <div className="lg:col-span-4 flex items-center justify-center lg:justify-end gap-3">
            <div className="rounded-lg px-5 py-2.5 shadow-lg" style={{ backgroundColor: theme.primary }}>
              <h3 className="text-white font-bold text-center text-xs mb-1">NOMBRE DE CADEAU</h3>
              <div className="rounded-lg px-5 py-1.5" style={{ backgroundColor: theme.accent }}>
                <p className="text-2xl font-bold text-center text-gray-800">{gifts.length}</p>
              </div>
            </div>

            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="h-12 px-5 text-sm text-white font-bold shadow-lg"
              style={{ backgroundColor: '#10b981', ':hover': { backgroundColor: '#059669' } }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </div>
        </div>

        {/* Add Gift Form */}
        <AddGiftForm
          isOpen={showAddForm}
          onAdd={(data) => createGiftMutation.mutate(data)}
          onCancel={() => setShowAddForm(false)}
          devise={devise}
          theme={theme}
        />

        {/* Toggle Stats Button and Theme Selector */}
        <div className="mb-4 flex gap-3">
          <Button
            onClick={() => setShowStats(!showStats)}
            variant="outline"
            className="bg-white hover:bg-gray-100"
          >
            {showStats ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
            {showStats ? 'Masquer' : 'Afficher'} les statistiques
          </Button>
          <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
        </div>

        {/* Statistics Section */}
        {showStats && (
          <div className="space-y-4 mb-6">
            {/* Budget boxes in line */}
            <BudgetSection
              budget={budget}
              onUpdate={(data) => updateBudgetMutation.mutate(data)}
              totalDepense={totalDepense}
              totalBudgetise={totalBudgetise}
              theme={theme}
            />

            {/* Chart and Table side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="h-[350px]">
                <BudgetComparisonChart 
                  totalBudgetise={totalBudgetise}
                  totalDepense={totalDepense}
                  budgetTotal={budgetTotal}
                  devise={devise}
                  theme={theme}
                />
              </div>
              <div className="h-[350px]">
                <CategoryTable gifts={gifts} devise={devise} theme={theme} />
              </div>
            </div>

            {/* Stats Cards in line */}
            <StatsCards gifts={gifts} theme={theme} />
          </div>
        )}

        {/* Gift Table */}
        <div className="mb-8">
          <GiftTable
            gifts={gifts}
            onUpdate={(id, data) => updateGiftMutation.mutate({ id, data })}
            onDelete={(id) => deleteGiftMutation.mutate(id)}
            devise={devise}
            theme={theme}
          />
        </div
      </div>
    </div>
  );
}
