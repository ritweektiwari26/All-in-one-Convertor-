
import React from 'react';
import { UnitDefinition } from '../types';

interface UnitSelectorProps {
  label: string;
  value: string;
  units: UnitDefinition[];
  onChange: (value: string) => void;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({ label, value, units, onChange }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all cursor-pointer appearance-none"
      >
        {units.map((unit) => (
          <option key={unit.id} value={unit.id}>
            {unit.name} ({unit.symbol})
          </option>
        ))}
      </select>
    </div>
  );
};

export default UnitSelector;
