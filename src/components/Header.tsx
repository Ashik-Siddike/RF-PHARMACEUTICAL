import { useState } from 'react';
import { Menu, X, Phone, Mail, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { id: 'home', labelKey: 'nav.home' },
    { id: 'about', labelKey: 'nav.about' },
    { id: 'products', labelKey: 'nav.products' },
    { id: 'export', labelKey: 'nav.export' },
    { id: 'careers', labelKey: 'nav.careers' },
    { id: 'news', labelKey: 'nav.news' },
    { id: 'contact', labelKey: 'nav.contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="bg-gradient-to-r from-teal-700 to-teal-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <a href="tel:+880123456789" className="flex items-center hover:text-teal-100 transition">
                <Phone className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">+880 123 456 789</span>
              </a>
              <a href="mailto:info@rfpharma.com" className="flex items-center hover:text-teal-100 transition">
                <Mail className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">info@rfpharma.com</span>
              </a>
            </div>
            <button
              onClick={toggleLanguage}
              className="flex items-center hover:text-teal-100 transition px-3 py-1 rounded hover:bg-white hover:bg-opacity-10"
            >
              <Globe className="h-4 w-4 mr-1" />
              <span className="font-semibold">{language === 'en' ? 'EN' : 'বাং'}</span>
              <span className="mx-1">|</span>
              <span className="opacity-70">{language === 'en' ? 'বাং' : 'EN'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">RF</span>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-teal-800">RF PHARMACEUTICAL</h1>
                <p className="text-xs text-emerald-600 font-medium">{t('header.tagline')}</p>
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-teal-600 border-b-2 border-teal-600'
                    : 'text-gray-700 hover:text-teal-600'
                }`}
              >
                {t(item.labelKey)}
              </button>
            ))}
          </nav>

          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {t(item.labelKey)}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
