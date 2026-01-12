
import React, { useState, useMemo } from 'react';
import { CATEGORIES, UNITS } from './constants';
import { UnitCategory, ConversionState } from './types';
import UnitSelector from './components/UnitSelector';
import SmartConvert from './components/SmartConvert';

const App: React.FC = () => {
  const [state, setState] = useState<ConversionState>({
    category: 'Length',
    fromValue: '1',
    fromUnit: UNITS.Length[0].id,
    toUnit: UNITS.Length[1].id,
    result: null,
  });

  // Handle category change - Reset units to the first two of the new category
  const handleCategoryChange = (category: UnitCategory) => {
    if (category === 'Smart') {
      setState(prev => ({ ...prev, category }));
      return;
    }
    const categoryUnits = UNITS[category as keyof typeof UNITS];
    setState({
      category,
      fromValue: '1',
      fromUnit: categoryUnits[0].id,
      toUnit: categoryUnits[1]?.id || categoryUnits[0].id,
      result: null,
    });
  };

  // Validation logic: strictly positive numbers (> 0)
  const validationError = useMemo(() => {
    if (state.category === 'Smart' || !state.fromValue) return null;
    const val = parseFloat(state.fromValue);
    if (isNaN(val)) return 'Please enter a valid number';
    if (val <= 0) return 'Please enter a positive number';
    return null;
  }, [state.fromValue, state.category]);

  // Memoize calculation to prevent unnecessary re-renders
  const calculatedResult = useMemo(() => {
    if (state.category === 'Smart' || validationError) return null;

    const val = parseFloat(state.fromValue);
    if (isNaN(val)) return null;

    const categoryUnits = UNITS[state.category as keyof typeof UNITS];
    const fromUnitDef = categoryUnits.find(u => u.id === state.fromUnit);
    const toUnitDef = categoryUnits.find(u => u.id === state.toUnit);

    if (!fromUnitDef || !toUnitDef) return null;

    // Special handling for Temperature
    if (state.category === 'Temperature') {
      let celsius;
      // Step 1: Convert from source to Celsius
      if (fromUnitDef.id === 'c') celsius = val;
      else if (fromUnitDef.id === 'f') celsius = (val - 32) * (5/9);
      else celsius = val - 273.15; // Kelvin

      // Step 2: Convert from Celsius to target
      if (toUnitDef.id === 'c') return celsius;
      if (toUnitDef.id === 'f') return (celsius * (9/5)) + 32;
      return celsius + 273.15; // Kelvin
    }

    // Standard linear conversion using factors
    const valueInBase = val * fromUnitDef.factor;
    const finalResult = valueInBase / toUnitDef.factor;

    // Formatting
    if (finalResult === 0) return 0;
    if (Math.abs(finalResult) < 0.0001 || Math.abs(finalResult) > 1000000000) {
      return finalResult.toExponential(4);
    }
    return parseFloat(finalResult.toFixed(6));
  }, [state.fromValue, state.fromUnit, state.toUnit, state.category, validationError]);

  const swapUnits = () => {
    setState(prev => ({
      ...prev,
      fromUnit: prev.toUnit,
      toUnit: prev.fromUnit,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">RT <span className="text-indigo-600">Convertor</span></h1>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-sm font-medium text-slate-500">All-In-One Converter</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-8">
        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-8 no-scrollbar pb-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all shadow-sm ${
                state.category === cat
                  ? 'bg-indigo-600 text-white shadow-indigo-200'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {state.category === 'Smart' ? (
          <SmartConvert />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Left Panel: From */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
                <UnitSelector
                  label="From Unit"
                  value={state.fromUnit}
                  units={UNITS[state.category as keyof typeof UNITS]}
                  onChange={(val) => setState(prev => ({ ...prev, fromUnit: val }))}
                />
                <div className="space-y-1 relative">
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Amount</label>
                  <input
                    type="number"
                    min="0.0000000001"
                    step="any"
                    value={state.fromValue}
                    onChange={(e) => setState(prev => ({ ...prev, fromValue: e.target.value }))}
                    className={`w-full text-2xl font-bold p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 transition-all ${
                      validationError 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-slate-100 focus:ring-indigo-500'
                    }`}
                    placeholder="Enter value"
                  />
                  {validationError && (
                    <p className="text-red-500 text-xs font-semibold mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                      {validationError}
                    </p>
                  )}
                </div>
              </div>

              {/* Swap Button (Desktop) */}
              <div className="hidden md:flex flex-col justify-center items-center h-full">
                <button
                  onClick={swapUnits}
                  className="p-4 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors shadow-sm"
                  title="Swap Units"
                >
                  <svg className="w-6 h-6 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </button>
              </div>

              {/* Mobile Swap Button */}
              <div className="flex md:hidden justify-center">
                 <button
                  onClick={swapUnits}
                  className="p-4 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors shadow-sm"
                >
                  <svg className="w-6 h-6 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </div>

              {/* Right Panel: To */}
              <div className="bg-indigo-600 p-6 rounded-3xl shadow-xl shadow-indigo-100 text-white space-y-4">
                <UnitSelector
                  label="To Unit"
                  value={state.toUnit}
                  units={UNITS[state.category as keyof typeof UNITS]}
                  onChange={(val) => setState(prev => ({ ...prev, toUnit: val }))}
                />
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-indigo-200 uppercase tracking-wider">Result</label>
                  <div className={`w-full text-3xl font-bold py-3 min-h-[4rem] flex items-center break-all transition-opacity duration-200 ${validationError ? 'opacity-50' : 'opacity-100'}`}>
                    {calculatedResult !== null ? calculatedResult : '---'}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Suggestions / Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Speed</div>
                    <div className="text-sm font-semibold">Real-time conversions</div>
                  </div>
               </div>
               <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Accuracy</div>
                    <div className="text-sm font-semibold">High precision rounding</div>
                  </div>
               </div>
               <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l-.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 21V12z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Powered</div>
                    <div className="text-sm font-semibold">Smart query engine</div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-400 font-medium">© 2024 RT All in one convertor app. All units calibrated for Earth standards.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
