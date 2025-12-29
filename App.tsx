// App.tsx
import React, { useState, useEffect } from 'react';
import { CharacterCounter } from './components/CharacterCounter';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Separate effect to apply dark class whenever theme changes
  useEffect(() => {
    console.log('Applying theme class:', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]); // This runs whenever theme state changes

  // Listen for theme messages from Ghost site
  useEffect(() => {
    const handleThemeMessage = (event: MessageEvent) => {
      // Log all incoming messages for debugging
      console.log('Received message:', event.data, 'from:', event.origin);
      
      if (event.data?.type === 'THEME_CHANGE') {
        console.log('Changing theme to:', event.data.theme);
        setTheme(event.data.theme);
      }
    };

    window.addEventListener('message', handleThemeMessage);
    
    // Request initial theme from parent if in iframe
    if (window.parent !== window) {
      console.log('In iframe, requesting initial theme');
      window.parent.postMessage({ type: 'REQUEST_THEME' }, '*');
    }

    return () => window.removeEventListener('message', handleThemeMessage);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans text-gray-900 dark:text-white pt-6 pb-12 px-4 flex items-start justify-center transition-colors duration-300">
      <div className="w-full max-w-[460px] mx-auto">
        <CharacterCounter />
      </div>
    </div>
  );
};

export default App;
