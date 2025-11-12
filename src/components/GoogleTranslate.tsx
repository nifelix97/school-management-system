import { useEffect, useState } from "react";

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    // Load Google Translate script once
    const addGoogleTranslateScript = () => {
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );
      };

      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    addGoogleTranslateScript();
  }, []);

  // Function to handle manual language switch
  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    const selectEl = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;
    if (selectEl) {
      selectEl.value = lang;
      selectEl.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* Hidden Google Translate element */}
      <div id="google_translate_element" style={{ display: "none" }} />

      {/* Your custom language dropdown */}
      <select
        className="block w-full p-2 text-black bg-white rounded-md shadow-md focus:outline-none focus:ring-primary-500"
        value={selectedLanguage}
        onChange={(e) => handleLanguageChange(e.target.value)}
      >
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
        <option value="de">German</option>
        <option value="ar">Arabic</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
