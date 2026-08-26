import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Truck, Navigation, ShieldCheck, Phone, ExternalLink, Compass, Key } from 'lucide-react';

const MapView = ({ donation }) => {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "");
  const [keyInput, setKeyInput] = useState("");
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [currentCoords, setCurrentCoords] = useState(null);
  const [gpsActive, setGpsActive] = useState(false);
  const [locationPermissionRequested, setLocationPermissionRequested] = useState(false);

  const mapRef = useRef(null);
  const googleMapObjRef = useRef(null);
  const markerRef = useRef(null);
  const pathPolylineRef = useRef(null);

  const donorName = donation?.donorName || "Green Leaf Fine Dining";
  const ngoName = donation?.ngoName || "Hope Foundation India";
  const driverName = donation?.deliveryDriver?.name || "Ramesh Kumar";
  const driverVehicle = donation?.deliveryDriver?.vehicleNo || "GJ-06-EV-4412";
  const driverPhone = donation?.deliveryDriver?.phone || "+919106633221";

  // Coordinates: Default route between Alkapuri Vadodara (Donor) and Sayajigunj Vadodara (NGO)
  const donorCoords = { lat: 22.3106, lng: 73.1730 };
  const ngoCoords = { lat: 22.3072, lng: 73.1811 };

  // Request & Watch GPS Geolocation
  const requestLocation = () => {
    setLocationPermissionRequested(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentCoords(coords);
          setGpsActive(true);
        },
        (error) => {
          console.warn("Browser Geolocation error:", error.message);
          setGpsActive(false);
        },
        { enableHighAccuracy: true }
      );
    }
  };

  useEffect(() => {
    requestLocation();
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
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#2c4c3e" }] },
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
          scaledSize: new google.maps.Size(40, 40)
        }
      });

      // NGO Pin
      new google.maps.Marker({
        position: ngoCoords,
        map: mapInstance,
        title: `NGO: ${ngoName}`,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
          scaledSize: new google.maps.Size(40, 40)
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

  return (
    <div className="bg-emerald-950 text-white rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden border border-emerald-800 space-y-4">
      
      {/* Header Overlay */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-800/80 pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <Navigation className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            <h3 className="text-base font-black font-outfit">Live GPS Route & Map</h3>
          </div>
          <p className="text-xs text-emerald-300">
            Route: <strong className="text-amber-400">{donorName}</strong> → <strong className="text-emerald-400">{ngoName}</strong>
          </p>
        </div>

        {/* GPS Permission Request Button */}
        {!gpsActive && (
          <button
            onClick={requestLocation}
            className="px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs shadow-md flex items-center space-x-1.5 btn-bounce-active shrink-0"
          >
            <Compass className="w-4 h-4" />
            <span>Allow Location Access</span>
          </button>
        )}
      </div>

      {/* Mobile Map Container — Fills almost the entire screen height on mobile */}
      <div className="relative w-full h-[55vh] min-h-[350px] sm:h-[450px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-inner">
        
        {/* Real Interactive Google Map */}
        <div
          ref={mapRef}
          className={`w-full h-full ${!apiKey && 'hidden'}`}
        />

        {/* Dynamic Fallback Vector Map */}
        {!apiKey && (
          <div className="relative w-full h-full bg-slate-950 flex flex-col justify-between p-4 overflow-hidden">
            <div 
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#10b981 1px, transparent 1px), radial-gradient(#d97706 1px, #0f172a 1px)`,
                backgroundSize: '24px 24px'
              }}
            />

            <div className="relative z-10 flex items-center justify-between bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 text-xs">
              <span className="font-bold text-emerald-200">Donor 📍 → Delivery 🚚 → NGO 📍</span>
              <span className="text-[10px] text-amber-400 font-mono">GPS Active</span>
            </div>

            <div className="relative z-10 my-auto text-center p-5 bg-emerald-950/80 backdrop-blur-md rounded-2xl border border-emerald-800 max-w-sm mx-auto shadow-2xl space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center animate-pulse">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-black text-sm text-white">Live Telematics Route</h4>
              <p className="text-xs text-emerald-200">
                Tracking vehicle <span className="text-amber-400 font-bold">{driverVehicle}</span> en route to <span className="text-emerald-400 font-bold">{ngoName}</span>.
              </p>
            </div>
          </div>
        )}

        {/* MOBILE FLOATING CONTROLS SPECIFICATION */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 bg-emerald-950/90 backdrop-blur-md p-3 rounded-2xl border border-emerald-700 shadow-2xl">
          
          {/* Open Navigation */}
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${ngoCoords.lat},${ngoCoords.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-h-[44px] px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs flex items-center justify-center space-x-1.5 shadow-md btn-bounce-active shrink-0"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Navigation</span>
          </a>

          {/* Current Status Badge */}
          <div className="px-3 py-2 rounded-xl bg-emerald-900 text-emerald-200 text-xs font-bold border border-emerald-700 text-center shrink-0">
            <span>Status: </span>
            <strong className="text-amber-400">{donation?.status || 'In Transit'}</strong>
          </div>

          {/* Call Contact */}
          <a
            href={`tel:${driverPhone}`}
            className="min-h-[44px] px-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs flex items-center justify-center space-x-1 shadow-md btn-bounce-active shrink-0"
          >
            <Phone className="w-4 h-4 text-emerald-200" />
            <span>Call Contact</span>
          </a>

        </div>

      </div>

    </div>
  );
};

export default MapView;
