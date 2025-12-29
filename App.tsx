// App.tsx
import React, { useState, useEffect } from 'react';
import { CharacterCounter } from './components/CharacterCounter';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Listen for theme messages from Ghost site
  useEffect(() => {
    const handleThemeMessage = (event: MessageEvent) => {
      if (event.data?.type === 'THEME_CHANGE') {
        setTheme(event.data.theme);
        // Apply dark class to html element for Tailwind
        if (event.data.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    window.addEventListener('message', handleThemeMessage);
    
    // Request initial theme from parent if in iframe
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'REQUEST_THEME' }, '*');
    }

    return () => window.removeEventListener('message', handleThemeMessage);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans text-gray-900 dark:text-white pt-6 pb-12 px-4 flex items-start justify-center transition-colors duration-300">
      <div className="w-full max-w-[460px] mx-auto">
        <CharacterCounter />
      </div>
    </div>
  );
};

export default App;
