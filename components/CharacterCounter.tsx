// components/CharacterCounter.tsx
import React, { useState, useCallback } from 'react';
import { Type, Eraser, Copy, Check, Hash, ChevronDown } from 'lucide-react';
import { PLATFORM_LIMITS } from '../constants';
import { TruncationBar } from './TruncationBar';

export const CharacterCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isTruncationExpanded, setIsTruncationExpanded] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  const handleClear = () => setText('');

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;
  const hashtagCount = (text.match(/#[a-zA-Z0-9_]+/g) || []).length;

  return (
    <div className="w-full">
      {/* Tool Header - Outside the card */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 dark:bg-blue-500 rounded-2xl shadow-lg shadow-blue-600/10 dark:shadow-blue-500/20 mb-5 text-white transform -rotate-6 transition-transform hover:scale-105 duration-300">
          <Type className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Character Counter</h1>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 max-w-[420px] mx-auto font-normal leading-relaxed">
          <span className="font-bold text-gray-900 dark:text-white">Fast, reliable character counting.</span> Your hook doesn't matter if it gets cut off. We mapped the truncation points for LinkedIn and Meta so you can check your work instantly before you publish.
        </p>
      </div>

      {/* Main Interface Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-black/50 border border-gray-200 dark:border-zinc-800 p-6 transition-colors duration-300">
        <div className="flex flex-col gap-6">
          
          {/* Input Section */}
          <div className="flex flex-col gap-5">
            <div className="relative group">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing or paste text..."
                className="w-full h-40 p-5 rounded-2xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white text-base placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-zinc-800 focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 outline-none resize-none transition-all duration-200"
                spellCheck={false}
              />
              <div className="absolute bottom-3 right-3 flex gap-2">
                 {text.length > 0 && (
                  <>
                    <button 
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-500 shadow-sm transition-all hover:shadow-md"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                    <button 
                      onClick={handleClear}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-500 shadow-sm transition-all hover:shadow-md"
                    >
                      <Eraser className="w-3 h-3" />
                      Clear
                    </button>
                  </>
                 )}
              </div>
            </div>

            {/* Basic Stats Row */}
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-white dark:bg-zinc-800 p-3 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm flex flex-col items-center justify-center hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{charCount}</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-wider mt-1">Characters</span>
                </div>
                <div className="bg-white dark:bg-zinc-800 p-3 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm flex flex-col items-center justify-center hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{wordCount}</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-wider mt-1">Words</span>
                </div>
                <div className="bg-white dark:bg-zinc-800 p-3 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm flex flex-col items-center justify-center hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{hashtagCount}</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-wider mt-1">Hashtags</span>
                </div>
            </div>
          </div>

          {/* Analysis Section */}
          <div className="flex flex-col pt-1">
            <button 
              onClick={() => setIsTruncationExpanded(!isTruncationExpanded)}
              className="flex items-center justify-between w-full group p-3 rounded-xl border border-transparent hover:border-gray-100 dark:hover:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all duration-200"
            >
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors">
                        <Hash className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col items-start text-left">
                        <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Social Post Truncation Check</h3>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">Optional • Click to view safe zones</span>
                    </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${isTruncationExpanded ? 'rotate-180' : ''}`} />
            </button>
            
            {isTruncationExpanded && (
                <div className="flex flex-col gap-3 mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
                {PLATFORM_LIMITS.map((platform) => (
                    <TruncationBar
                    key={platform.id}
                    current={charCount}
                    max={platform.limit}
                    label={platform.name}
                    description={platform.description}
                    Icon={platform.icon}
                    />
                ))}
                </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
