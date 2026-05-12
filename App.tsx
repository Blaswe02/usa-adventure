import React, { useState } from 'react';
import { ViewState, PlayerState, LocationData } from './types';
import { LOCATIONS } from './data';
import Intro from './components/Intro';
import MapHub from './components/MapHub';
import LocationLevel from './components/LocationLevel';
import OracleChamber from './components/OracleChamber';
import MysteryGate from './components/MysteryGate';
import Inventory from './components/Inventory';
import Button from './components/Button';
import { Star, RotateCcw } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('intro');
  const [playerState, setPlayerState] = useState<PlayerState>({
    inventory: [],
    completedLocations: [],
    dream: ''
  });
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);

  const activeLocation = LOCATIONS.find(l => l.id === activeLocationId);

  const handleIntroComplete = () => {
    setView('map');
  };

  const handleSelectLocation = (id: string) => {
    setActiveLocationId(id);
    setView('location');
  };

  const handleLocationComplete = () => {
    if (activeLocation) {
      setPlayerState(prev => ({
        ...prev,
        completedLocations: [...prev.completedLocations, activeLocation.id],
        inventory: [...prev.inventory, activeLocation.symbol]
      }));
      setView('map');
      setActiveLocationId(null);
    }
  };

  const handleBackToMap = () => {
    setActiveLocationId(null);
    setView('map');
  };

  const handleEnterOracle = () => {
    setView('mystery_gate');
  };

  const handleMysteryGateComplete = () => {
    setView('oracle');
  };

  const handleFinalComplete = (dream: string) => {
    setPlayerState(prev => ({ ...prev, dream }));
    setView('ending');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-red-500 selection:text-white">
      {view !== 'intro' && view !== 'ending' && (
        <Inventory symbols={playerState.inventory} />
      )}

      {view === 'intro' && (
        <Intro onComplete={handleIntroComplete} />
      )}

      {view === 'map' && (
        <MapHub
          locations={LOCATIONS}
          completedLocations={playerState.completedLocations}
          onSelectLocation={handleSelectLocation}
          onEnterOracle={handleEnterOracle}
        />
      )}

      {view === 'location' && activeLocation && (
        <LocationLevel
          location={activeLocation}
          onBack={handleBackToMap}
          onComplete={handleLocationComplete}
        />
      )}

      {view === 'mystery_gate' && (
        <MysteryGate
          locations={LOCATIONS}
          onComplete={handleMysteryGateComplete}
        />
      )}

      {view === 'oracle' && (
        <OracleChamber onComplete={handleFinalComplete} />
      )}

      {view === 'ending' && (
        <div className="min-h-screen bg-blue-950 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl font-serif text-red-400 mb-6">Adventure Complete</h1>
          <div className="bg-slate-900 p-8 rounded-xl shadow-2xl border border-red-700 max-w-lg w-full">
            <h2 className="text-xl text-slate-400 mb-4">Your American Dream:</h2>
            <p className="text-2xl font-serif text-white italic mb-8">"{playerState.dream}"</p>

            <div className="flex flex-col gap-4">
              <div className="flex justify-center gap-3 mb-2">
                <Star className="w-6 h-6 text-yellow-400" />
                <Star className="w-6 h-6 text-yellow-400" />
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <button
                onClick={() => window.location.reload()}
                className="text-red-400 hover:text-red-300 underline flex items-center justify-center gap-2 mt-2"
              >
                <RotateCcw className="w-4 h-4" /> Start New Adventure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
