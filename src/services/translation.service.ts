import { Injectable, signal, computed } from '@angular/core';
import { translations } from '../i18n';

type LanguageCode = 'tr' | 'en' | 'de' | 'ru' | 'sv';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private langKey = 'social-media-lang';

  supportedLanguages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  ];
  
  public allTranslations: any = translations;
  
  currentLang = signal<LanguageCode>('en');
  translations = computed(() => this.allTranslations[this.currentLang()] || this.allTranslations.en);
  direction = computed<'ltr' | 'rtl'>(() => 'ltr');
  currentLanguageInfo = computed(() => this.supportedLanguages.find(l => l.code === this.currentLang()));

  constructor() {
    this.init();
  }

  private init() {
    let initialLang: LanguageCode = 'en';
    const savedLang = localStorage.getItem(this.langKey) as LanguageCode;

    if (savedLang && this.supportedLanguages.some(l => l.code === savedLang)) {
      initialLang = savedLang;
    } else {
      const browserLang = navigator.language.split('-')[0] as LanguageCode;
      if (this.supportedLanguages.some(l => l.code === browserLang)) {
        initialLang = browserLang;
      }
    }
    this.use(initialLang);
  }

  use(lang: string) {
    const langCode = lang as LanguageCode;
    if (this.supportedLanguages.some(l => l.code === langCode)) {
      this.currentLang.set(langCode);
      localStorage.setItem(this.langKey, langCode);
    }
  }

  get(key: string, replacements?: { [key: string]: string }): any {
    const keys = key.split('.');
    let result = this.translations();

    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        // Fallback to English
        let fallbackResult = this.allTranslations.en;
        for (const fk of keys) {
            fallbackResult = fallbackResult?.[fk];
        }
        result = fallbackResult !== undefined ? fallbackResult : key;
        break;
      }
    }

    if (typeof result === 'string' && replacements) {
      for (const placeholder in replacements) {
        result = result.replace(`{${placeholder}}`, replacements[placeholder]);
      }
    }
    
    return result;
  }

  getEnglishImageStyle(translatedStyle: string): string {
    const englishStyles = this.allTranslations.en.imageStyles;
    const currentStyles = this.translations().imageStyles;
    const styleIndex = currentStyles.indexOf(translatedStyle);
    return englishStyles[styleIndex] || translatedStyle;
  }
}
