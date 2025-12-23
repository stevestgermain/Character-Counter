import React from 'react';
import { CharacterCounter } from './components/CharacterCounter';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f9fafb] font-sans text-gray-900 pt-6 pb-12 px-4 flex items-start justify-center">
      <div className="w-full max-w-[460px] mx-auto">
        <CharacterCounter />
      </div>
    </div>
  );
};

export default App;