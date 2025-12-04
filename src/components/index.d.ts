export interface TranslationContextType {
  changeLanguage: (lang: string) => void;
}

export interface TranslationProviderProps {
  children: React.ReactNode;
  originalLang: string;
}

export declare const TranslationContext: React.Context<TranslationContextType | undefined>;
export declare const TranslationProvider: React.FC<TranslationProviderProps>;
export declare const useGoogleTranslateScript: (originalLang: string) => void;

export default function FloatingLanguageSelector(): JSX.Element;