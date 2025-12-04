import React, { createContext, useEffect, useRef } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit?: () => void;
  }
}

interface TranslationContextType {
  changeLanguage: (lang: string) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const useGoogleTranslateScript = (originalLang: string) => {
  useEffect(() => {
    const scriptId = "google-translate-script";
    if (document.getElementById(scriptId)) {
      return;
    }
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: originalLang,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };
  }, [originalLang]);
};

interface TranslationProviderProps {
  children: React.ReactNode;
  originalLang: string;
}

const TranslationProvider: React.FC<TranslationProviderProps> = ({ children, originalLang }) => {
  const googleTranslateElementRef = useRef(null);

  const overrideGoogleTranslateStyles = () => {
    const style = document.body.style;
    style.position = "static";
    style.minHeight = "0";
    style.top = "0";
  };

  useGoogleTranslateScript(originalLang);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // if (mutation.type === 'childList' && mutation.addedNodes.length) {
        //     mutation.addedNodes.forEach(node => {
        //         if (node.nodeName === 'IFRAME' && node.classList.contains('skiptranslate')) {
        //             // Hide the toolbar by setting its style
        //             node.style.display = 'none';
        //         }
        //     });
        // }
      });
    });

    if (googleTranslateElementRef.current) {
      observer.observe(googleTranslateElementRef.current, {
        childList: true,
        subtree: true,
      });
    }

    setTimeout(overrideGoogleTranslateStyles, 215);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `iframe.VIpgJd-ZVi9od-ORHb-OEVmcd.skiptranslate {
            display: none !important;
            visibility: hidden !important;
        }

         .VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc {
            display: none !important;
            visibility: hidden !important;
            }

        `;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const changeLanguage = (lang: string) => {
    // deleteCookies
    const hostname = window.location.hostname;
    const parts = hostname.split(".");
    const topLevel = parts.slice(-2).join(".");
    const subDomains = parts.slice(0, -2);
    const domains = subDomains.reduce(
      (acc, part, index) => {
        const subDomain = acc[index - 1]
          ? acc[index - 1] + "." + part
          : part + "." + topLevel;
        acc.push(subDomain);
        return acc;
      },
      [topLevel]
    );
    domains.forEach((domain) => {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.${domain}; path=/ `;
      // setTimeout(()=>{},500)
      console.log("deleted and set cookie for: ." + domain);
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${domain}; path=/ `;
    });

    document.cookie = `googtrans=/auto/${lang}; path=/;`;
    console.log(" set cookie for: " + hostname);

    setTimeout(() => {
      window.location.reload();
    }, 0);
  };

  return (
    <TranslationContext.Provider value={{ changeLanguage }}>
      {children}
      <div
        style={{ display: "none" }}
        ref={googleTranslateElementRef}
        id="google_translate_element"
      ></div>
    </TranslationContext.Provider>
  );
};



export { TranslationProvider, TranslationContext, useGoogleTranslateScript };
export type { TranslationContextType };
