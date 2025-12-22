import React from 'react';
import { CharacterCounter } from './components/CharacterCounter';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f9fafb] font-sans text-gray-900 py-8 md:py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto">
        <CharacterCounter />
      </div>
    </div>
  );
};

export default App;