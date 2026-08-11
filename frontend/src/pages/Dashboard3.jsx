import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, AlertTriangle, MapPin, Heart } from 'lucide-react';
import jsPDF from 'jspdf';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Dashboard3() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;
  const input = location.state?.input;
  const [showMotivate, setShowMotivate] = useState(false);

  if (!data) {
    return <div className="text-center mt-20"><button onClick={() => navigate('/')}>Go Back</button></div>;
  }

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("MEDIDIAGNOSE AI Report", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Symptoms: ${input?.symptoms || 'N/A'}`, 20, 40);
    
    doc.setFontSize(16);
    doc.text("Top Predictions:", 20, 60);
    data.predictions.forEach((p, idx) => {
      doc.setFontSize(12);
      doc.text(`${idx+1}. ${p.condition} (${p.similarity.toFixed(1)}%)`, 20, 70 + (idx*10));
    });

    doc.setFontSize(10);
    doc.setTextColor(200, 0, 0);
    doc.text(data.disclaimer, 20, 150, { maxWidth: 170 });
    
    doc.save("medical_report.pdf");
    setShowMotivate(true);
  };

  if (showMotivate) {
    return (
      <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center">
        <Heart className="w-32 h-32 text-red-500 glow-heartbeat mb-8" />
        <h1 className="text-4xl font-bold mb-4">Your Health is Important</h1>
        <p className="text-xl text-gray-400 mb-8">Take care of yourself and consult a professional.</p>
        <button onClick={() => navigate('/')} className="bg-blue-600 py-2 px-6 rounded-lg text-white">Return Home</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
      {/* Left Column */}
      <div className="space-y-6">
        <div className="glass-panel p-6">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">AI Predictions</h2>
          <div className="space-y-4">
            {data.predictions.map((p, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-lg">{p.condition}</span>
                  <span className="text-blue-400 font-bold">{p.similarity.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${p.similarity}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 bg-red-900/20 border-red-900">
          <h2 className="text-xl font-bold mb-2 flex items-center text-red-400">
            <AlertTriangle className="mr-2" /> Medical Warning
          </h2>
          <p className="text-sm text-gray-300">
            {data.guidance} <br/><br/>
            <strong>Disclaimer:</strong> {data.disclaimer}
          </p>
        </div>

        <button onClick={generatePDF} className="w-full glass-panel p-4 flex items-center justify-center hover:bg-gray-800 transition">
          <Download className="mr-2" /> Download PDF Report
        </button>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold mb-4">Detected Tags</h2>
          <div className="flex flex-wrap gap-2">
            {data.keywords?.map((kw, i) => (
              <span key={i} className="bg-blue-900 text-blue-200 text-xs px-3 py-1 rounded-full">{kw}</span>
            ))}
            <span className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">{input?.duration}</span>
            <span className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">{input?.severity}</span>
          </div>
        </div>

        <div className="glass-panel p-6 h-96 flex flex-col">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <MapPin className="mr-2" /> Nearby Doctors
          </h2>
          <div className="flex-1 rounded-lg overflow-hidden border border-gray-700 relative">
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[51.505, -0.09]}>
                <Popup>General Practitioner<br/>Available today.</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
