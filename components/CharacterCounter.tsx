import React, { useState, useCallback } from 'react';
import { Type, Eraser, Copy, Check, Hash } from 'lucide-react';
import { PLATFORM_LIMITS } from '../constants';
import { TruncationBar } from './TruncationBar';

export const CharacterCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  const handleClear = () => setText('');

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;
  // Regex matches a hash followed by one or more alphanumeric characters or underscores
  const hashtagCount = (text.match(/#[a-zA-Z0-9_]+/g) || []).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Tool Header */}
      <div className="p-8 pb-6 text-center border-b border-gray-100">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg shadow-md mb-4 text-white">
          <Type className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Character Counter</h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Get instant, accurate character counts for any project with this fast and reliable solution.
        </p>
      </div>

      <div className="p-6 md:p-8 bg-gray-50/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Input Section */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative group">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing or paste your text here..."
                className="w-full h-60 p-5 rounded-lg border border-gray-300 bg-white text-gray-900 text-lg placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-shadow shadow-sm"
                spellCheck={false}
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                 {text.length > 0 && (
                  <>
                    <button 
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded-md text-gray-600 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                    <button 
                      onClick={handleClear}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded-md text-gray-600 hover:text-red-600 hover:border-red-200 shadow-sm transition-colors"
                    >
                      <Eraser className="w-3.5 h-3.5" />
                      Clear
                    </button>
                  </>
                 )}
              </div>
            </div>

            {/* Basic Stats Row */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{charCount}</span>
                    <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Characters</span>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{wordCount}</span>
                    <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Words</span>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{hashtagCount}</span>
                    <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Hashtags</span>
                </div>
            </div>
          </div>

          {/* Analysis Section */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1">
                <Hash className="w-5 h-5 text-gray-400" />
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Truncation Check</h3>
            </div>
            
            <div className="flex flex-col gap-3">
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

            <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-sm text-blue-800 leading-relaxed">
                    <strong>Pro Tip:</strong> Limits are approximate. We use established "safe zones" to account for varying pixel widths across different screens.
                </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};