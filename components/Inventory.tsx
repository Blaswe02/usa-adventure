import React from 'react';
import { SymbolType } from '../types';
import { Flame, Star, Anchor, Shield } from 'lucide-react';

interface InventoryProps {
  symbols: SymbolType[];
}

const Inventory: React.FC<InventoryProps> = ({ symbols }) => {
  const getIcon = (type: SymbolType) => {
    switch (type) {
      case 'Flame': return <Flame className="w-5 h-5 text-red-400" />;
      case 'Star': return <Star className="w-5 h-5 text-yellow-400" />;
      case 'Anchor': return <Anchor className="w-5 h-5 text-blue-300" />;
      case 'Shield': return <Shield className="w-5 h-5 text-slate-300" />;
    }
  };

  const allSymbols: SymbolType[] = ['Flame', 'Star', 'Anchor', 'Shield'];

  return (
    <div className="fixed top-0 left-0 right-0 bg-blue-950/90 border-b border-blue-800 p-3 z-50 flex justify-between items-center backdrop-blur-sm shadow-lg">
      <div className="text-blue-100 font-serif font-bold text-lg hidden sm:block pl-2">
        Liberty's Quest
      </div>

      <div className="flex gap-2">
        <span className="text-blue-200/70 text-sm mr-2 flex items-center">Symbols:</span>
        {allSymbols.map((s) => (
          <div
            key={s}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
              symbols.includes(s)
                ? 'bg-blue-900 border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                : 'bg-slate-900 border-slate-700 opacity-30'
            }`}
            title={symbols.includes(s) ? s : 'Unknown'}
          >
            {getIcon(s)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
