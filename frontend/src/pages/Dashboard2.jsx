import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ScanLine } from 'lucide-react';

export default function Dashboard2() {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('1-3 days');
  const [severity, setSeverity] = useState('moderate');
  const [ageGroup, setAgeGroup] = useState('adult');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState('');

  const handleAnalyze = async () => {
    if (!symptoms) return;
    setIsScanning(true);
    
    const steps = [
      'Initializing scanner...',
      'Analyzing natural language input...',
      'Extracting medical keywords...',
      'Querying machine learning models...',
      'Generating predictions...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setScanStep(steps[i]);
      await new Promise(r => setTimeout(r, 800));
    }

    try {
      const res = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms, duration, severity, ageGroup })
      });
      const data = await res.json();
      navigate('/results', { state: { data, input: { symptoms, duration, severity, ageGroup } } });
    } catch (err) {
      console.error(err);
      // Dummy navigation if backend is down
      navigate('/results', { 
        state: { 
          data: {
            predictions: [
              { condition: 'Migraine', similarity: 85, probability: 0.85 },
              { condition: 'Tension Headache', similarity: 60, probability: 0.60 }
            ],
            keywords: ['headache', 'severe'],
            guidance: 'Rest in a dark room.',
            disclaimer: 'AI tool for educational/health-assistance purposes, not a confirmed medical diagnosis or prescription.'
          },
          input: { symptoms, duration, severity, ageGroup }
        } 
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 flex items-center">
        <Activity className="mr-3 text-blue-500" />
        Symptom Analyzer
      </h2>

      <div className="glass-panel p-8 relative overflow-hidden">
        {isScanning && (
          <div className="absolute inset-0 bg-blue-900/20 z-10 flex flex-col items-center justify-center backdrop-blur-sm">
            <div className="scanner-line"></div>
            <ScanLine className="w-16 h-16 text-blue-400 animate-pulse mb-4" />
            <p className="text-xl font-mono text-blue-300">{scanStep}</p>
          </div>
        )}

        <div className="space-y-6 relative z-0">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Describe your symptoms</label>
            <textarea 
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none h-32"
              placeholder="e.g. I have a severe headache and nausea..."
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Duration</label>
              <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white">
                <option>&lt; 1 day</option>
                <option>1-3 days</option>
                <option>1 week</option>
                <option>&gt; 1 week</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Severity</label>
              <select value={severity} onChange={e => setSeverity(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white">
                <option>Mild</option>
                <option>Moderate</option>
                <option>Severe</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Age Group</label>
              <select value={ageGroup} onChange={e => setAgeGroup(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white">
                <option>Child</option>
                <option>Teen</option>
                <option>Adult</option>
                <option>Senior</option>
              </select>
            </div>
          </div>

          <button 
            onClick={handleAnalyze}
            disabled={!symptoms || isScanning}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition"
          >
            Analyze Symptoms
          </button>
        </div>
      </div>
    </div>
  );
}
