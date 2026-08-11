import React from 'react';
import { useApp } from '../context/AppContext';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { language, setLanguage } = useApp();

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'gu', label: 'ગુજરાતી', flag: '🇮🇳' }
  ];

  return (
    <div className="relative flex items-center bg-emerald-950/10 border border-emerald-800/20 rounded-full px-2.5 py-1">
      <Globe className="w-4 h-4 text-emerald-700 mr-1.5" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-transparent text-xs font-semibold text-emerald-950 focus:outline-none cursor-pointer pr-1"
        aria-label="Language Preference Selector"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-white text-gray-900 font-medium">
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
