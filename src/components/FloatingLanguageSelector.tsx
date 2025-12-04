import { Globe } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { TranslationContext } from './TranslationProvider';

const languageOptions = [
  { value: 'en', label: 'English', countryCode: 'gb' },
  { value: 'fr', label: 'French', countryCode: 'fr' },
  { value: 'ar', label: 'Arabic', countryCode: 'sa' },
  { value: 'bm', label: 'Bambara', countryCode: 'ml' },
  { value: 'rw', label: 'Kinyarwanda', countryCode: 'rw' }
];

interface FloatingLanguageSelectorProps {
  inline?: boolean; // When true, uses relative positioning for inline display
}

export default function FloatingLanguageSelector({ inline = false }: FloatingLanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .goog-te-banner-frame { display: none !important; }
      body { top: 0 !important; }
      .flag-icon { width: 16px; height: 12px; margin-right: 8px; }
    `;
    document.head.appendChild(style);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css';
    document.head.appendChild(link);

    return () => {
      if (style.parentNode) style.parentNode.removeChild(style);
      if (link.parentNode) link.parentNode.removeChild(link);
    };
  }, []);

  const translationContext = useContext(TranslationContext);

  const changeLanguage = (langCode: string) => {
    setSelectedLanguage(langCode);
    if (translationContext) {
      translationContext.changeLanguage(langCode);
    }
    document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  return (
    <div className={inline ? "relative inline-block" : "fixed bottom-4 right-4 z-50 md:relative md:inline-block md:bottom-auto md:right-auto"}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-primary-50 p-3 rounded-full hover:bg-opacity-80 transition-all"
        aria-label="Language selector"
      >
        <Globe size={20} />
      </button>
      
      {isOpen && (
        <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg p-3 min-w-[200px] z-50">
          <div className="text-sm font-medium text-gray-700 mb-2">Select Language</div>
          <div className="space-y-2">
            {languageOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => changeLanguage(option.value)}
                className={`w-full flex items-center p-2 rounded hover:bg-gray-100 text-left ${
                  selectedLanguage === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <span className={`flag-icon flag-icon-${option.countryCode}`}></span>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}