import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Edit2, Save, X, ExternalLink, ShoppingCart, Package, Gift } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';

const CATEGORIES = ["Familles", "Amis", "Couple", "Bons voisins", "Voisins", "Collègues", "Animaux", "Moi", "Autres"];

export default function GiftTable({ gifts, onUpdate, onDelete, devise, theme }) {
  const [editingGift, setEditingGift] = useState(null);
  const [editData, setEditData] = useState({});

  const startEdit = (gift) => {
    setEditingGift(gift);
    setEditData(gift);
  };

  const saveEdit = async () => {
    await onUpdate(editingGift.id, editData);
    setEditingGift(null);
  };

  const cancelEdit = () => {
    setEditingGift(null);
    setEditData({});
  };

  const toggleStatus = (gift, field) => {
    const updatedData = { ...gift, [field]: !gift[field] };
    onUpdate(gift.id, updatedData);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-white" style={{ backgroundColor: theme.primary }}>
              <tr>
                <th colSpan="13" className="px-4 py-3 text-left">
                  <h2 className="text-white font-bold text-xl">📋 Liste des Cadeaux</h2>
                </th>
              </tr>
              <tr>
                <th className="px-3 py-3 text-left font-semibold">Pour qui</th>
                <th className="px-3 py-3 text-left font-semibold">Quoi</th>
                <th className="px-3 py-3 text-left font-semibold">Lien/Magasin</th>
                <th className="px-3 py-3 text-left font-semibold">Prix budgété</th>
                <th className="px-3 py-3 text-left font-semibold">Prix dépensé</th>
                <th className="px-3 py-3 text-center font-semibold">Différence</th>
                <th className="px-3 py-3 text-center font-semibold">
                  <div className="flex items-center justify-center gap-1">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Acheté</span>
                  </div>
                </th>
                <th className="px-3 py-3 text-center font-semibold">
                  <div className="flex items-center justify-center gap-1">
                    <Package className="w-4 h-4" />
                    <span>Emballé</span>
                  </div>
                </th>
                <th className="px-3 py-3 text-center font-semibold">
                  <div className="flex items-center justify-center gap-1">
                    <Gift className="w-4 h-4" />
                    <span>Donné</span>
                  </div>
                </th>
                <th className="px-3 py-3 text-left font-semibold">Mode</th>
                <th className="px-3 py-3 text-left font-semibold">Réception</th>
                <th className="px-3 py-3 text-left font-semibold">Catégorie</th>
                <th className="px-3 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {gifts.map((gift, index) => {
                const difference = (gift.prix_budgete || 0) - (gift.prix_depense || 0);
                return (
                  <tr key={gift.id} className={`border-b hover:bg-red-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`} style={{ borderColor: theme.accent }}>
                    <td className="px-3 py-3">
                      <span className="text-sm font-medium">{gift.pour_qui}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-sm">{gift.quoi}</span>
                    </td>
                    <td className="px-3 py-3">
                      {gift.lien_ou_magasin && (
                        gift.lien_ou_magasin.startsWith('http') ? (
                          <a href={gift.lien_ou_magasin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" /> Lien
                          </a>
                        ) : (
                          <span className="text-sm">{gift.lien_ou_magasin}</span>
                        )
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-sm font-medium">{gift.prix_budgete?.toFixed(2)} {devise}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-sm font-medium">{gift.prix_depense?.toFixed(2)} {devise}</span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className={`text-sm font-bold ${difference < 0 ? 'text-red-600' : difference > 0 ? 'text-green-600' : 'text-gray-600'}`}>
                        {difference.toFixed(2)} {devise}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <button
                        onClick={() => toggleStatus(gift, 'achete')}
                        className={`w-10 h-10 rounded-lg border-2 transition-all flex items-center justify-center ${
                          gift.achete 
                            ? 'bg-green-500 border-green-600 text-white hover:bg-green-600' 
                            : 'bg-white border-gray-300 text-gray-400 hover:border-green-500 hover:text-green-500'
                        }`}
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <button
                        onClick={() => toggleStatus(gift, 'emballe')}
                        className={`w-10 h-10 rounded-lg border-2 transition-all flex items-center justify-center ${
                          gift.emballe 
                            ? 'bg-blue-500 border-blue-600 text-white hover:bg-blue-600' 
                            : 'bg-white border-gray-300 text-gray-400 hover:border-blue-500 hover:text-blue-500'
                        }`}
                      >
                        <Package className="w-5 h-5" />
                      </button>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <button
                        onClick={() => toggleStatus(gift, 'donne')}
                        className={`w-10 h-10 rounded-lg border-2 transition-all flex items-center justify-center ${
                          gift.donne 
                            ? 'bg-purple-500 border-purple-600 text-white hover:bg-purple-600' 
                            : 'bg-white border-gray-300 text-gray-400 hover:border-purple-500 hover:text-purple-500'
                        }`}
                      >
                        <Gift className="w-5 h-5" />
                      </button>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-sm">{gift.mode_achat}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-sm">{gift.date_reception}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-xs text-gray-800 px-2 py-1 rounded" style={{ backgroundColor: theme.accent }}>{gift.categorie}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex gap-2 justify-center">
                        <Button onClick={() => startEdit(gift)} size="sm" variant="outline" className="h-8">
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button onClick={() => onDelete(gift.id)} size="sm" variant="destructive" className="h-8">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {gifts.length === 0 && (
                <tr>
                  <td colSpan={13} className="text-center py-12 text-gray-500">
                    <div className="text-4xl mb-2">🎁</div>
                    <p className="text-lg">Aucun cadeau ajouté</p>
                    <p className="text-sm">Cliquez sur "Ajouter un cadeau" pour commencer!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingGift} onOpenChange={(open) => !open && cancelEdit()}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold" style={{ color: theme.primary }}>
              Modifier le cadeau
            </DialogTitle>
          </DialogHeader>
          {editingGift && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Pour qui ?</Label>
                  <Input
                    value={editData.pour_qui}
                    onChange={(e) => setEditData({ ...editData, pour_qui: e.target.value })}
                    className="h-11 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Catégorie</Label>
                  <Select value={editData.categorie} onValueChange={(value) => setEditData({ ...editData, categorie: value })}>
                    <SelectTrigger className="h-11 text-base">
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

              <div className="space-y-2">
                <Label className="text-base font-semibold">Quoi ?</Label>
                <Input
                  value={editData.quoi}
                  onChange={(e) => setEditData({ ...editData, quoi: e.target.value })}
                  className="h-11 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold">Lien ou magasin</Label>
                <Input
                  value={editData.lien_ou_magasin}
                  onChange={(e) => setEditData({ ...editData, lien_ou_magasin: e.target.value })}
                  className="h-11 text-base"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Prix budgété ({devise})</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={editData.prix_budgete}
                    onChange={(e) => setEditData({ ...editData, prix_budgete: parseFloat(e.target.value) || 0 })}
                    className="h-11 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Prix dépensé ({devise})</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={editData.prix_depense}
                    onChange={(e) => setEditData({ ...editData, prix_depense: parseFloat(e.target.value) || 0 })}
                    className="h-11 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Mode d'achat</Label>
                  <Input
                    value={editData.mode_achat}
                    onChange={(e) => setEditData({ ...editData, mode_achat: e.target.value })}
                    className="h-11 text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold">Date de réception</Label>
                <Input
                  type="date"
                  value={editData.date_reception}
                  onChange={(e) => setEditData({ ...editData, date_reception: e.target.value })}
                  className="h-11 text-base"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                  <Checkbox
                    checked={editData.achete}
                    onCheckedChange={(checked) => setEditData({ ...editData, achete: checked })}
                    className="w-5 h-5"
                  />
                  <Label className="text-base font-medium">Acheté ?</Label>
                </div>
                <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                  <Checkbox
                    checked={editData.emballe}
                    onCheckedChange={(checked) => setEditData({ ...editData, emballe: checked })}
                    className="w-5 h-5"
                  />
                  <Label className="text-base font-medium">Emballé ?</Label>
                </div>
                <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                  <Checkbox
                    checked={editData.donne}
                    onCheckedChange={(checked) => setEditData({ ...editData, donne: checked })}
                    className="w-5 h-5"
                  />
                  <Label className="text-base font-medium">Donné ?</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold">Notes</Label>
                <Textarea
                  value={editData.notes}
                  onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                  className="min-h-20 text-base"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={saveEdit} className="flex-1 h-11 text-base bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" /> Sauvegarder
                </Button>
                <Button onClick={cancelEdit} variant="outline" className="h-11 text-base">
                  <X className="w-4 h-4 mr-2" /> Annuler
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
