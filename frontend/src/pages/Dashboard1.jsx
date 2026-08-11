import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Shield, Clock } from 'lucide-react';

export default function Dashboard1() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Next-Gen <span className="text-blue-500">Healthcare</span> at your fingertips
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Advanced AI symptom analysis with futuristic glassmorphism interface. 
            Get immediate insights and locate nearby doctors instantly.
          </p>
          
          <div className="glass-panel p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => navigate('/analyzer')}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition"
              >
                Continue as Guest
              </button>
              <div className="flex space-x-4">
                <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg transition">
                  Login
                </button>
                <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg transition">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 flex items-start space-x-4">
            <Activity className="w-8 h-8 text-blue-400 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">How It Works</h3>
              <p className="text-gray-400">Describe your symptoms in natural language. Our NLP backend extracts key indicators.</p>
            </div>
          </div>
          
          <div className="glass-panel p-6 flex items-start space-x-4">
            <Shield className="w-8 h-8 text-blue-400 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">AI Diagnosis</h3>
              <p className="text-gray-400">Scikit-learn Logistic Regression models predict top conditions based on your inputs.</p>
            </div>
          </div>

          <div className="glass-panel p-6 flex items-start space-x-4">
            <Clock className="w-8 h-8 text-blue-400 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Fast & Secure</h3>
              <p className="text-gray-400">Instant PDF reports and localized doctor finding via OpenStreetMap.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
