import { Injectable, signal, WritableSignal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

export interface Language {
  code: string;
  name: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  
  readonly languages: Language[] = [
    {
      code: 'ar',
      name: 'العربية',
      flag: '🇸🇦',
      direction: 'rtl'
    },
    {
      code: 'en',
      name: 'English',
      flag: '🇺🇸',
      direction: 'ltr'
    }
  ];

  private readonly STORAGE_KEY = 'esnad-language';
  readonly currentLanguage: WritableSignal<Language> = signal(this.languages[0]);

  constructor() {
    this.loadSavedLanguage();
  }

  private loadSavedLanguage(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      const lang = this.languages.find(l => l.code === saved);
      if (lang) {
        this.currentLanguage.set(lang);
        this.applyLanguage(lang);
      }
    }
  }

  switchLanguage(languageCode: string): void {
    const language = this.languages.find(l => l.code === languageCode);
    if (language) {
      this.currentLanguage.set(language);
      this.applyLanguage(language);
      localStorage.setItem(this.STORAGE_KEY, languageCode);
      
      // Reload the page to apply the new language
      window.location.reload();
    }
  }

  private applyLanguage(language: Language): void {
    const htmlElement = this.document.documentElement;
    htmlElement.setAttribute('lang', language.code);
    htmlElement.setAttribute('dir', language.direction);
    
    // Update body class for styling
    this.document.body.classList.remove('rtl', 'ltr');
    this.document.body.classList.add(language.direction);
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage();
  }

  isRTL(): boolean {
    return this.currentLanguage().direction === 'rtl';
  }
}