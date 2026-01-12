
import React, { useState } from 'react';
import { getSmartConversion } from '../services/geminiService';
import { AIConversionResponse } from '../types';

const SmartConvert: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AIConversionResponse | null>(null);
  const [error, setError] = useState('');

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    try {
      const result = await getSmartConversion(query);
      setData(result);
    } catch (err) {
      console.error(err);
      setError('Could not process the request. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
        <h2 className="text-xl font-bold text-indigo-900 mb-2">Smart AI Conversion</h2>
        <p className="text-indigo-700 mb-6 text-sm">
          Ask anything: "50 football fields to meters", "Weight of 100 standard bricks", or "Temperature on Mars in Celsius".
        </p>
        
        <form onSubmit={handleConvert} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your conversion query..."
            className="w-full p-4 pr-32 bg-white border border-indigo-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 bg-indigo-600 text-white px-6 rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Thinking...' : 'Convert'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm">
          {error}
        </div>
      )}

      {data && (
        <div className="grid gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Result</span>
            <div className="text-3xl font-bold text-slate-900">{data.result}</div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">How it works</span>
            <p className="text-slate-600 leading-relaxed">{data.explanation}</p>
          </div>

          <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-lg shadow-indigo-200">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-indigo-200" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM6.464 14.95a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414z" />
              </svg>
              <span className="text-xs font-bold uppercase tracking-widest">Did you know?</span>
            </div>
            <p className="text-indigo-50 font-medium italic">"{data.funFact}"</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartConvert;
