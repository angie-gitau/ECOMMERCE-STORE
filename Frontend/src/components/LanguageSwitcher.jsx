import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-orange-400 hover:bg-orange-100 transition duration-300">
        <FaGlobe className="text-orange-600" />
        <span className="text-sm font-medium text-gray-700">
          {i18n.language === 'en' ? 'EN' : 'SW'}
        </span>
      </button>
      
      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        <button
          onClick={() => changeLanguage('en')}
          className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition duration-200 ${
            i18n.language === 'en' ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
          }`}
        >
          English
        </button>
        <button
          onClick={() => changeLanguage('sw')}
          className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition duration-200 ${
            i18n.language === 'sw' ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
          }`}
        >
          Kiswahili
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;