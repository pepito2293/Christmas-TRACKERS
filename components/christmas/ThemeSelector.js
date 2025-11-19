import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Palette } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';

export const THEMES = {
  classic: {
    name: "Classique Noël",
    primary: "#c63b3b",
    primaryDark: "#a63030",
    secondary: "#2d5f3f",
    accent: "#ffc5c5",
    accentDark: "#ffb5b5",
    background: "#1a4d2e"
  },
  winter: {
    name: "Hivernal",
    primary: "#4a90e2",
    primaryDark: "#3a7bc8",
    secondary: "#1e3a5f",
    accent: "#b8d4f1",
    accentDark: "#9fc4e8",
    background: "#0f2942"
  },
  minimal: {
    name: "Minimaliste",
    primary: "#2c3e50",
    primaryDark: "#1a252f",
    secondary: "#34495e",
    accent: "#ecf0f1",
    accentDark: "#bdc3c7",
    background: "#95a5a6"
  },
  colorful: {
    name: "Coloré",
    primary: "#e74c3c",
    primaryDark: "#c0392b",
    secondary: "#9b59b6",
    accent: "#f39c12",
    accentDark: "#e67e22",
    background: "#16a085"
  },
  pink: {
    name: "Rose Doux",
    primary: "#e91e63",
    primaryDark: "#c2185b",
    secondary: "#880e4f",
    accent: "#f8bbd0",
    accentDark: "#f48fb1",
    background: "#4a148c"
  }
};

export default function ThemeSelector({ currentTheme, onThemeChange }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-white hover:bg-gray-100"
        >
          <Palette className="w-4 h-4 mr-2" />
          Personnaliser le thème
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Choisir un thème
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Thème prédéfini</Label>
            <Select value={currentTheme} onValueChange={onThemeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(THEMES).map(key => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: THEMES[key].primary }}
                      />
                      {THEMES[key].name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3 pt-4 border-t">
            <Label>Aperçu des couleurs</Label>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <div 
                  className="w-full h-12 rounded-md"
                  style={{ backgroundColor: THEMES[currentTheme].primary }}
                />
                <p className="text-xs text-center text-gray-600">Principal</p>
              </div>
              <div className="space-y-1">
                <div 
                  className="w-full h-12 rounded-md"
                  style={{ backgroundColor: THEMES[currentTheme].secondary }}
                />
                <p className="text-xs text-center text-gray-600">Secondaire</p>
              </div>
              <div className="space-y-1">
                <div 
                  className="w-full h-12 rounded-md"
                  style={{ backgroundColor: THEMES[currentTheme].accent }}
                />
                <p className="text-xs text-center text-gray-600">Accent</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
