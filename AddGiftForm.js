import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, X } from 'lucide-react';

const CATEGORIES = ["Familles", "Amis", "Couple", "Bons voisins", "Voisins", "Collègues", "Animaux", "Moi", "Autres"];

export default function AddGiftForm({ onAdd, onCancel, devise, isOpen, theme }) {
  const [formData, setFormData] = useState({
    pour_qui: '',
    quoi: '',
    lien_ou_magasin: '',
    prix_budgete: 0,
    prix_depense: 0,
    achete: false,
    emballe: false,
    donne: false,
    mode_achat: '',
    date_reception: '',
    categorie: 'Familles',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.pour_qui && formData.quoi) {
      onAdd(formData);
      setFormData({
        pour_qui: '',
        quoi: '',
        lien_ou_magasin: '',
        prix_budgete: 0,
        prix_depense: 0,
        achete: false,
        emballe: false,
        donne: false,
        mode_achat: '',
        date_reception: '',
        categorie: 'Familles',
        notes: ''
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2" style={{ color: theme.primary }}>
            <Plus className="w-5 h-5" />
            Ajouter un nouveau cadeau
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pour_qui" className="text-base font-semibold">
                Pour qui ? <span className="text-red-500">*</span>
              </Label>
              <Input
                id="pour_qui"
                value={formData.pour_qui}
                onChange={(e) => setFormData({ ...formData, pour_qui: e.target.value })}
                placeholder="Ex: Maman, Papa, Sophie..."
                className="h-12 text-base"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categorie" className="text-base font-semibold">
                Catégorie <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.categorie} onValueChange={(value) => setFormData({ ...formData, categorie: value })}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="space-y-2">
            <Label htmlFor="quoi" className="text-base font-semibold">
              Quoi ? <span className="text-red-500">*</span>
            </Label>
            <Input
              id="quoi"
              value={formData.quoi}
              onChange={(e) => setFormData({ ...formData, quoi: e.target.value })}
              placeholder="Ex: Livre de cuisine, Écharpe en laine..."
              className="h-12 text-base"
              required
            />
          </div>

          {/* Row 3 */}
          <div className="space-y-2">
            <Label htmlFor="lien_ou_magasin" className="text-base font-semibold">
              Lien ou nom du magasin
            </Label>
            <Input
              id="lien_ou_magasin"
              value={formData.lien_ou_magasin}
              onChange={(e) => setFormData({ ...formData, lien_ou_magasin: e.target.value })}
              placeholder="Ex: https://... ou Fnac, Amazon..."
              className="h-12 text-base"
            />
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prix_budgete" className="text-base font-semibold">
                Prix budgété ({devise})
              </Label>
              <Input
                id="prix_budgete"
                type="number"
                step="0.01"
                value={formData.prix_budgete}
                onChange={(e) => setFormData({ ...formData, prix_budgete: e.target.value === '' ? 0 : parseFloat(e.target.value) || 0 })}
                className="h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prix_depense" className="text-base font-semibold">
                Prix dépensé ({devise})
              </Label>
              <Input
                id="prix_depense"
                type="number"
                step="0.01"
                value={formData.prix_depense}
                onChange={(e) => setFormData({ ...formData, prix_depense: e.target.value === '' ? 0 : parseFloat(e.target.value) || 0 })}
                className="h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mode_achat" className="text-base font-semibold">
                Mode d'achat
              </Label>
              <Input
                id="mode_achat"
                value={formData.mode_achat}
                onChange={(e) => setFormData({ ...formData, mode_achat: e.target.value })}
                placeholder="Ex: En ligne, En magasin"
                className="h-12 text-base"
              />
            </div>
          </div>

          {/* Row 5 */}
          <div className="space-y-2">
            <Label htmlFor="date_reception" className="text-base font-semibold">
              Date de réception
            </Label>
            <Input
              id="date_reception"
              type="date"
              value={formData.date_reception}
              onChange={(e) => setFormData({ ...formData, date_reception: e.target.value })}
              className="h-12 text-base"
            />
          </div>

          {/* Row 6 - Checkboxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg">
              <Checkbox
                id="achete"
                checked={formData.achete}
                onCheckedChange={(checked) => setFormData({ ...formData, achete: checked })}
                className="w-5 h-5"
              />
              <Label htmlFor="achete" className="text-base font-medium cursor-pointer">
                Acheté ?
              </Label>
            </div>
            <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg">
              <Checkbox
                id="emballe"
                checked={formData.emballe}
                onCheckedChange={(checked) => setFormData({ ...formData, emballe: checked })}
                className="w-5 h-5"
              />
              <Label htmlFor="emballe" className="text-base font-medium cursor-pointer">
                Emballé ?
              </Label>
            </div>
            <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg">
              <Checkbox
                id="donne"
                checked={formData.donne}
                onCheckedChange={(checked) => setFormData({ ...formData, donne: checked })}
                className="w-5 h-5"
              />
              <Label htmlFor="donne" className="text-base font-medium cursor-pointer">
                Donné ?
              </Label>
            </div>
          </div>

          {/* Row 7 - Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-base font-semibold">
              Notes
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Ajoutez des notes ou des détails supplémentaires..."
              className="min-h-24 text-base"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 h-12 text-base bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Ajouter le cadeau
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="h-12 text-base"
            >
              Annuler
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
