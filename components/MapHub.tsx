import React from 'react';
import { LocationData } from '../types';
import { Lock, MapPin, CheckCircle, Star } from 'lucide-react';
import Button from './Button';

interface MapHubProps {
  locations: LocationData[];
  completedLocations: string[];
  onSelectLocation: (id: string) => void;
  onEnterOracle: () => void;
}

const MapHub: React.FC<MapHubProps> = ({
  locations,
  completedLocations,
  onSelectLocation,
  onEnterOracle
}) => {
  const allCompleted = locations.every(loc => completedLocations.includes(loc.id));

  return (
    <div className="min-h-screen bg-blue-950 p-4 pt-20 flex flex-col items-center">
      <h2 className="text-3xl font-serif text-red-400 mb-2 text-center">Map of America</h2>
      <p className="text-blue-200/80 mb-8 text-center max-w-lg">
        Visit the landmarks. Help Liberty find the four lost national symbols.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full mb-12">
        {locations.map((loc) => {
          const isCompleted = completedLocations.includes(loc.id);
          return (
            <div
              key={loc.id}
              onClick={() => !isCompleted && onSelectLocation(loc.id)}
              className={`relative group rounded-xl overflow-hidden border-2 transition-all cursor-pointer h-48 sm:h-64 ${
                isCompleted
                  ? 'border-blue-600 opacity-75'
                  : 'border-slate-600 hover:border-red-500 hover:scale-[1.02]'
              }`}
            >
              <img
                src={loc.introImage}
                alt={loc.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-serif text-white mb-2 flex items-center gap-2">
                  {loc.name}
                  {isCompleted && <CheckCircle className="text-red-400 w-6 h-6" />}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base">{loc.shortDescription}</p>
                {!isCompleted && (
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 font-bold flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Visit
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-blue-950/90 border-t border-blue-800 flex justify-center backdrop-blur">
        <Button
          variant={allCompleted ? 'primary' : 'secondary'}
          onClick={onEnterOracle}
          disabled={!allCompleted}
          className="w-full max-w-md py-4 text-lg"
        >
          {allCompleted ? 'Unlock the American Dream' : `Collect all Symbols (${completedLocations.length}/4)`}
          {allCompleted ? <Star className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
        </Button>
      </div>
    </div>
  );
};

export default MapHub;
