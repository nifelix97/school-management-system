import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit?: () => void;
  }
}

export default function FloatingLanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { 
          pageLanguage: 'en',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        'google_translate_element_floating'
      );
    };
    
    document.head.appendChild(script);
    
    const style = document.createElement('style');
    style.textContent = `
      .goog-te-banner-frame { display: none !important; }
      body { top: 0 !important; }
      .goog-te-gadget { font-size: 0 !important; }
      .goog-te-combo { 
        padding: 4px 8px !important;
        border-radius: 4px !important;
        border: 1px solid #d1d5db !important;
        font-size: 12px !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      const existingScript = document.querySelector('script[src*="translate.google.com"]');
      if (existingScript) existingScript.remove();
      if (style.parentNode) style.parentNode.removeChild(style);
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-50 text-white p-3 rounded-full shadow-lg hover:bg-opacity-80 transition-all"
        aria-label="Language selector"
      >
        <Globe size={20} />
      </button>
      
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 min-w-[200px]">
          <div className="text-sm font-medium text-gray-700 mb-2">Select Language</div>
          <div id="google_translate_element_floating"></div>
        </div>
      )}
    </div>
  );
}