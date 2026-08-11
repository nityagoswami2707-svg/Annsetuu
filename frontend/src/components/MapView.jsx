import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Truck, Navigation, ShieldCheck, Phone, RefreshCw, Key, Compass } from 'lucide-react';

const MapView = ({ donation }) => {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "");
  const [keyInput, setKeyInput] = useState("");
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [currentCoords, setCurrentCoords] = useState(null);
  const [gpsActive, setGpsActive] = useState(false);

  const mapRef = useRef(null);
  const googleMapObjRef = useRef(null);
  const markerRef = useRef(null);
  const pathPolylineRef = useRef(null);

  const donorName = donation?.donorName || "Green Leaf Fine Dining";
  const ngoName = donation?.ngoName || "Hope Foundation India";
  const driverName = donation?.deliveryDriver?.name || "Ramesh Kumar";
  const driverVehicle = donation?.deliveryDriver?.vehicleNo || "GJ-06-EV-4412";

  // Coordinates: Default route between Alkapuri Vadodara (Donor) and Sayajigunj Vadodara (NGO)
  const donorCoords = { lat: 22.3106, lng: 73.1730 };
  const ngoCoords = { lat: 22.3072, lng: 73.1811 };

  // Real-time browser device Geolocation tracking
  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentCoords(coords);
          setGpsActive(true);
        },
        (error) => {
          console.warn("Browser Geolocation note:", error.message);
          setGpsActive(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // Dynamically load Google Maps JavaScript SDK
  useEffect(() => {
    if (!apiKey) return;

    if (window.google && window.google.maps) {
      setIsMapLoaded(true);
      return;
    }

    const scriptId = "google-maps-sdk-script";
    const existingScript = document.getElementById(scriptId);
    if (existingScript) existingScript.remove();

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsMapLoaded(true);
    script.onerror = () => setIsMapLoaded(false);

    document.head.appendChild(script);
  }, [apiKey]);

  // Initialize and update Interactive Google Map instance
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current || !window.google) return;

    const google = window.google;
    const center = currentCoords || donorCoords;

    if (!googleMapObjRef.current) {
      const mapOptions = {
        center: center,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#1d2c26" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#1a2e26" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b0" }] },
          { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d5f5e3" }] },
          { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#6fa894" }] },
          { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#13382c" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#2c4c3e" }] },
          { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1b3329" }] },
          { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#95d5c5" }] },
          { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#059669" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f221a" }] }
        ]
      };

      const mapInstance = new google.maps.Map(mapRef.current, mapOptions);
      googleMapObjRef.current = mapInstance;

      // Donor Pin
      new google.maps.Marker({
        position: donorCoords,
        map: mapInstance,
        title: `Donor: ${donorName}`,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/amber-dot.png",
          scaledSize: new google.maps.Size(42, 42)
        }
      });

      // NGO Pin
      new google.maps.Marker({
        position: ngoCoords,
        map: mapInstance,
        title: `NGO: ${ngoName}`,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
          scaledSize: new google.maps.Size(42, 42)
        }
      });

      // Route Line
      pathPolylineRef.current = new google.maps.Polyline({
        path: [donorCoords, ngoCoords],
        geodesic: true,
        strokeColor: "#10b981",
        strokeOpacity: 0.8,
        strokeWeight: 4,
        map: mapInstance
      });
    }

    // Update Delivery Vehicle Marker position
    const vehiclePosition = currentCoords || {
      lat: (donorCoords.lat + ngoCoords.lat) / 2,
      lng: (donorCoords.lng + ngoCoords.lng) / 2
    };

    if (markerRef.current) {
      markerRef.current.setPosition(vehiclePosition);
    } else {
      markerRef.current = new google.maps.Marker({
        position: vehiclePosition,
        map: googleMapObjRef.current,
        title: `Live Vehicle: ${driverVehicle}`,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/truck.png",
          scaledSize: new google.maps.Size(44, 44)
        }
      });
    }

    if (currentCoords && googleMapObjRef.current) {
      googleMapObjRef.current.panTo(currentCoords);
    }
  }, [isMapLoaded, currentCoords]);

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    if (keyInput.trim()) {
      setApiKey(keyInput.trim());
    }
  };

  return (
    <div className="bg-emerald-950 text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden border border-emerald-800">
      
      {/* Map Header Overlay */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-emerald-800/80 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Navigation className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            <h3 className="text-base font-bold font-outfit">Google Maps Telematics & Live Location</h3>
          </div>
          <p className="text-xs text-emerald-300">
            Real-time Route: <span className="text-amber-400 font-semibold">{donorName}</span> → <span className="text-emerald-400 font-semibold">{ngoName}</span>
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-emerald-900/80 px-3 py-1.5 rounded-full border border-emerald-700">
          <span className={`w-2 h-2 rounded-full ${gpsActive ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
          <span className="font-semibold text-emerald-200">
            {gpsActive ? 'Live Device GPS Connected' : 'Simulated GPS Route Stream'}
          </span>
        </div>
      </div>

      {/* Google Maps API Key Connection Banner */}
      {!apiKey && (
        <div className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-emerald-950 border border-emerald-700/80 shadow-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Key className="w-5 h-5 text-amber-400 shrink-0" />
            <h4 className="font-bold text-sm text-white">Connect Official Google Maps API Key</h4>
          </div>
          <p className="text-xs text-emerald-200 mb-3">
            Enter your Google Maps API Key below to render interactive vector maps with real-time route polyline, or set <code className="bg-emerald-950 px-1 py-0.5 rounded text-amber-300">VITE_GOOGLE_MAPS_API_KEY</code> in <code className="bg-emerald-950 px-1 py-0.5 rounded text-emerald-300">.env</code>:
          </p>
          <form onSubmit={handleSaveApiKey} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Paste Google Maps API Key (AIzaSy...)"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="bg-emerald-950 border border-emerald-700 text-white placeholder-emerald-500 text-xs rounded-xl px-3 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs px-4 py-2 rounded-xl transition shadow-md whitespace-nowrap"
            >
              Load Interactive Map
            </button>
          </form>
        </div>
      )}

      {/* Google Maps Canvas Container */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-inner flex items-center justify-center">
        
        {/* Real Interactive Google Map */}
        <div
          ref={mapRef}
          className={`w-full h-full ${!apiKey && 'hidden'}`}
        />

        {/* Dynamic Fallback GPS Preview Mode */}
        {!apiKey && (
          <div className="relative w-full h-full bg-slate-950 flex flex-col justify-between p-4 overflow-hidden">
            <div 
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#10b981 1px, transparent 1px), radial-gradient(#d97706 1px, #0f172a 1px)`,
                backgroundSize: '24px 24px',
                backgroundPosition: '0 0, 12px 12px'
              }}
            />

            <div className="relative z-10 flex items-center justify-between bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 text-xs">
              <div className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '10s' }} />
                <span className="font-semibold text-emerald-200">Google Maps Live Location Engine</span>
              </div>
              <span className="text-[10px] text-amber-400 font-mono">GPS: 22.3106° N, 73.1730° E</span>
            </div>

            <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center p-6 bg-emerald-950/70 backdrop-blur-sm rounded-2xl border border-emerald-800/80 max-w-md mx-auto shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 ring-4 ring-amber-500/10 animate-pulse">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-white mb-1">Live Real-Time GPS Tracking Active</h4>
              <p className="text-xs text-emerald-200 mb-3">
                Tracking vehicle <span className="text-amber-400 font-mono font-bold">{driverVehicle}</span> from <span className="text-white font-semibold">{donorName}</span> to <span className="text-emerald-400 font-semibold">{ngoName}</span>.
              </p>
              {currentCoords && (
                <div className="text-[11px] text-emerald-300 bg-emerald-900/90 px-3 py-1.5 rounded-lg border border-emerald-700/80 font-mono mb-1">
                  🛰️ Device Location: Lat {currentCoords.lat.toFixed(4)}, Lng {currentCoords.lng.toFixed(4)}
                </div>
              )}
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px] text-emerald-400 font-mono bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800">
              <span>DONOR: Alkapuri, Vadodara</span>
              <span>NGO: Sayajigunj, Vadodara</span>
            </div>
          </div>
        )}

      </div>

      {/* Telematics Footer */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-800">
          <span className="text-[10px] text-emerald-400 font-bold uppercase">Assigned Delivery Partner</span>
          <p className="font-bold text-white text-sm mt-0.5">{driverName}</p>
          <p className="text-emerald-300 text-[11px] flex items-center mt-1">
            <Phone className="w-3 h-3 mr-1" /> {donation?.deliveryDriver?.phone || "+91 91066 33221"}
          </p>
        </div>

        <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-800">
          <span className="text-[10px] text-emerald-400 font-bold uppercase">Vehicle & Route Status</span>
          <p className="font-bold text-amber-400 text-sm mt-0.5">{driverVehicle}</p>
          <p className="text-emerald-200 text-[11px] mt-1">
            {currentCoords ? `Device GPS position synced (${currentCoords.lat.toFixed(3)}, ${currentCoords.lng.toFixed(3)})` : (donation?.deliveryDriver?.currentLocation || "En route on Sayajigunj Main Rd")}
          </p>
        </div>

        <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-800">
          <span className="text-[10px] text-emerald-400 font-bold uppercase">Estimated Arrival (ETA)</span>
          <p className="font-black text-emerald-400 text-base mt-0.5 font-outfit">12 Mins (3.4 km remaining)</p>
          <p className="text-emerald-300 text-[11px] mt-0.5">Cold-chain thermal insulation verified</p>
        </div>
      </div>

    </div>
  );
};

export default MapView;
