/**
 * @fileoverview Language Switcher Component
 * @description Component for switching between languages
 * @module shared/components/language-switcher
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '@core/services/i18n';

@Component({
  selector: 'app-language-switcher',
  imports: [CommonModule],
  template: `
    <div class="language-switcher">
      <button
        class="language-switcher__button"
        [class.language-switcher__button--active]="i18n.currentLang() === 'de'"
        (click)="i18n.setLanguage('de')"
        type="button"
      >
        🇩🇪 Deutsch
      </button>
      <button
        class="language-switcher__button"
        [class.language-switcher__button--active]="i18n.currentLang() === 'en'"
        (click)="i18n.setLanguage('en')"
        type="button"
      >
        🇬🇧 English
      </button>
    </div>
  `,
  styles: [
    `
      .language-switcher {
        display: flex;
        gap: 0.5rem;
        padding: 0.5rem;

        &__button {
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-color, #ccc);
          border-radius: 4px;
          background: var(--background-color, white);
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover {
            background: var(--hover-background, #f0f0f0);
          }

          &--active {
            background: var(--primary-color, #444df2);
            color: white;
            border-color: var(--primary-color, #444df2);
          }
        }
      }
    `,
  ],
})
export class LanguageSwitcherComponent {
  i18n = inject(I18nService);
}
