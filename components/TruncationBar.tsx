import React from 'react';
import { ProgressProps } from '../types';
import { CheckCircle2, AlertCircle, Ban } from 'lucide-react';

export const TruncationBar: React.FC<ProgressProps> = ({ current, max, label, description, Icon }) => {
  const percentage = Math.min((current / max) * 100, 100);
  const remaining = max - current;
  const isOver = current > max;
  const isWarning = !isOver && percentage > 85;
  const isSafe = !isOver && !isWarning;

  let statusColor = 'bg-gray-200';
  let barColor = 'bg-blue-600';
  let textColor = 'text-gray-500';

  if (isOver) {
    statusColor = 'bg-red-50';
    barColor = 'bg-red-500';
    textColor = 'text-red-600';
  } else if (isWarning) {
    statusColor = 'bg-yellow-50';
    barColor = 'bg-yellow-500';
    textColor = 'text-yellow-600';
  } else {
    statusColor = 'bg-green-50';
    barColor = 'bg-brand-blue';
    textColor = 'text-green-600';
  }

  return (
    <div className={`p-4 rounded-2xl border transition-all duration-200 ${isOver ? 'border-red-200 bg-red-50/30' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${isOver ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">{label}</h4>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        </div>
        <div className={`text-right flex flex-col items-end ${textColor}`}>
          <span className="text-sm font-mono font-medium">
            {remaining < 0 ? current : current} <span className="text-gray-400">/ {max}</span>
          </span>
          {isOver && (
            <span className="text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 mt-1">
              <Ban className="w-3 h-3" /> Truncated
            </span>
          )}
          {isWarning && (
            <span className="text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> Near Limit
            </span>
          )}
          {isSafe && current > 0 && (
             <span className="text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 mt-1">
             <CheckCircle2 className="w-3 h-3" /> Optimal
           </span>
          )}
        </div>
      </div>

      {/* Progress Bar Track */}
      <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ease-out rounded-full ${barColor}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Visual Marker for Overspill if over */}
      {isOver && (
         <div className="mt-1.5 text-xs text-red-600 font-medium text-right">
           {Math.abs(remaining)} chars over limit
         </div>
      )}
    </div>
  );
};