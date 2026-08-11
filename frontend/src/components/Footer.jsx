import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Heart, Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
  const { t } = useApp();

  return (
    <footer className="bg-green-950 text-green-100 pt-16 pb-8 border-t-2 border-orange-500/30 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-green-900/60">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-1.5 rounded-2xl border-2 border-green-500/30 shadow-md">
                <img 
                  src="/annsetu_logo.png" 
                  alt="Annsetu Logo" 
                  className="h-12 w-auto object-contain rounded-lg"
                />
              </div>
              <div>
                <span className="text-2xl font-black font-outfit text-white tracking-wider">Ann<span className="text-orange-400">setu</span></span>
                <p className="text-xs text-orange-300 font-bold">Bridging Surplus to Smiles</p>
              </div>
            </div>

            <p className="text-xs text-green-200/80 leading-relaxed max-w-sm">
              Annsetu is a technology-enabled social impact platform dedicated to eliminating urban food waste by connecting surplus meal providers with verified grassroots NGOs in real time.
            </p>

            <div className="flex space-x-3 pt-2">
              <a href="#twitter" aria-label="Twitter" className="w-9 h-9 rounded-full bg-green-900/80 hover:bg-orange-500 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#facebook" aria-label="Facebook" className="w-9 h-9 rounded-full bg-green-900/80 hover:bg-orange-500 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#instagram" aria-label="Instagram" className="w-9 h-9 rounded-full bg-green-900/80 hover:bg-orange-500 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#linkedin" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-green-900/80 hover:bg-orange-500 hover:text-white flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div>
            <h4 className="text-sm font-bold font-outfit text-white uppercase tracking-wider mb-4 border-l-2 border-orange-400 pl-2">
              Platform Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="hover:text-orange-300 transition-colors">Home</Link></li>
              <li><Link to="/donor" className="hover:text-orange-300 transition-colors">Donate Food</Link></li>
              <li><Link to="/ngo" className="hover:text-orange-300 transition-colors">Partner As NGO</Link></li>
              <li><Link to="/track" className="hover:text-orange-300 transition-colors">Track Donation</Link></li>
              <li><Link to="/impact" className="hover:text-orange-300 transition-colors">Our Impact</Link></li>
              <li><Link to="/admin" className="hover:text-orange-300 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Col 3: Stakeholders */}
          <div>
            <h4 className="text-sm font-bold font-outfit text-white uppercase tracking-wider mb-4 border-l-2 border-orange-400 pl-2">
              Stakeholders
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#restaurants" className="hover:text-orange-300 transition-colors">For Restaurants & Hotels</a></li>
              <li><a href="#weddings" className="hover:text-orange-300 transition-colors">Wedding & Caterers</a></li>
              <li><a href="#ngos" className="hover:text-orange-300 transition-colors">Verified NGO Network</a></li>
              <li><a href="#volunteers" className="hover:text-orange-300 transition-colors">Volunteer Logistics</a></li>
              <li><a href="#safety" className="hover:text-orange-300 transition-colors">Food Safety Guidelines</a></li>
              <li><a href="#faq" className="hover:text-orange-300 transition-colors">Help & FAQ</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-sm font-bold font-outfit text-white uppercase tracking-wider mb-4 border-l-2 border-orange-400 pl-2">
              Reach Us
            </h4>
            <ul className="space-y-3 text-xs text-green-200">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <span>Annsetu Hub, Sayajigunj Innovation Center, Vadodara, Gujarat - 390005</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span>+91 1800-ANNSETU (Toll Free)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>support@annsetu.org</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-green-300/80 space-y-4 sm:space-y-0">
          <p>© 2026 ANNSETU Platform. All rights reserved.</p>
          <div className="flex items-center space-x-1 font-bold text-orange-300 bg-green-900/80 px-4 py-1.5 rounded-full border border-green-800">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 animate-bounce" />
            <span>to reduce food waste and spread smiles.</span>
          </div>
          <div className="flex space-x-4">
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <a href="#terms" className="hover:underline">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
