/**
 * @fileoverview I18n Service with Signals
 * @description Type-safe internationalization service using Angular Signals
 * @module I18nService
 */

import { Injectable, signal, computed, effect } from '@angular/core';
import { translations, SupportedLanguage, TranslationKey } from './translations';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  // Current language as signal
  private currentLangSignal = signal<SupportedLanguage>('de');

  // Public readonly computed for current language
  currentLang = computed(() => this.currentLangSignal());

  // Current translations computed signal
  translations = computed(() => translations[this.currentLangSignal()]);

  constructor() {
    // Load language from localStorage on init
    const savedLang = this.loadLanguageFromStorage();
    if (savedLang) {
      this.currentLangSignal.set(savedLang);
    }

    // Save language to localStorage whenever it changes
    effect(() => {
      this.saveLanguageToStorage(this.currentLangSignal());
    });
  }

  /**
   * Translate a key to current language
   * @param key Translation key in dot notation (e.g., 'AUTH.LOGIN')
   * @returns Translated string
   */
  t(key: string): string {
    const keys = key.split('.');
    let value: any = this.translations();

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return value;
  }

  /**
   * Set the current language
   * @param lang Language code
   */
  setLanguage(lang: SupportedLanguage): void {
    this.currentLangSignal.set(lang);
  }

  /**
   * Toggle between German and English
   */
  toggleLanguage(): void {
    const current = this.currentLangSignal();
    this.currentLangSignal.set(current === 'de' ? 'en' : 'de');
  }

  /**
   * Load language preference from localStorage
   */
  private loadLanguageFromStorage(): SupportedLanguage | null {
    try {
      const saved = localStorage.getItem('dabubble_language');
      if (saved && (saved === 'de' || saved === 'en')) {
        return saved as SupportedLanguage;
      }
    } catch (error) {
      console.warn('Failed to load language from localStorage:', error);
    }
    return null;
  }

  /**
   * Save language preference to localStorage
   */
  private saveLanguageToStorage(lang: SupportedLanguage): void {
    try {
      localStorage.setItem('dabubble_language', lang);
    } catch (error) {
      console.warn('Failed to save language to localStorage:', error);
    }
  }
}
