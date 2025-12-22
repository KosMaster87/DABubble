# DABubble i18n System

## Übersicht

Type-safe Internationalisierung mit Angular Signals für DABubble.

## Features

✅ **Type-Safe**: TypeScript-Typen für alle Translation-Keys
✅ **Signal-basiert**: Moderne Angular Signals API
✅ **Auto-Completion**: IDE-Unterstützung durch TypeScript
✅ **Performance**: Keine HTTP-Requests, Tree-shakable
✅ **Persistence**: Sprachauswahl wird in localStorage gespeichert

## Verwendung

### 1. In Templates (mit Pipe)

```html
<!-- Einfache Verwendung -->
<h1>{{ 'COMMON.APP_NAME' | t }}</h1>
<button>{{ 'AUTH.LOGIN' | t }}</button>

<!-- In Attributen -->
<input [placeholder]="'CHAT.TYPE_MESSAGE' | t" />

<!-- Mit Interpolation -->
<p>{{ 'PROFILE.TITLE' | t }}</p>
```

### 2. In Components (mit Service)

```typescript
import { Component, inject } from '@angular/core';
import { I18nService } from '@services/i18n';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
})
export class LoginComponent {
  i18n = inject(I18nService);

  login() {
    const buttonText = this.i18n.t('AUTH.LOGIN');
    console.log(buttonText); // "Anmelden" oder "Login"
  }

  // Current language as computed signal
  currentLang = this.i18n.currentLang;
}
```

### 3. Sprache wechseln

```typescript
import { I18nService } from '@services/i18n';

export class LanguageSwitcher {
  i18n = inject(I18nService);

  switchToEnglish() {
    this.i18n.setLanguage('en');
  }

  switchToGerman() {
    this.i18n.setLanguage('de');
  }

  toggle() {
    this.i18n.toggleLanguage();
  }
}
```

### 4. In Templates auf aktuelle Sprache reagieren

```html
<div>
  Aktuelle Sprache: {{ i18n.currentLang() }}

  <button (click)="i18n.toggleLanguage()">
    {{ i18n.currentLang() === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln' }}
  </button>
</div>
```

## Struktur der Übersetzungen

```
src/app/services/i18n/
├── index.ts                 # Public exports
├── i18n.service.ts          # Service mit Signals
├── translate.pipe.ts        # Pipe für Templates
├── translations.ts          # Übersetzungen (Haupt-Datei)
└── README.md                # Diese Datei
```

## Neue Übersetzungen hinzufügen

Bearbeite `translations.ts`:

```typescript
export const translations = {
  de: {
    // Bestehende Übersetzungen...

    // Neue Kategorie hinzufügen
    MY_FEATURE: {
      TITLE: 'Mein Feature',
      BUTTON: 'Klick mich',
      MESSAGE: 'Hallo Welt',
    },
  },
  en: {
    // Gleiche Struktur auf Englisch
    MY_FEATURE: {
      TITLE: 'My Feature',
      BUTTON: 'Click me',
      MESSAGE: 'Hello World',
    },
  },
};
```

**Wichtig**: Beide Sprachen müssen die **gleiche Struktur** haben!

## Kategorien

Aktuelle Kategorien:

- `COMMON` - Allgemeine Begriffe
- `AUTH` - Authentifizierung
- `CHAT` - Chat-Funktionalität
- `CHANNELS` - Channel-Verwaltung
- `PROFILE` - Benutzerprofile
- `SETTINGS` - Einstellungen
- `ERRORS` - Fehlermeldungen

## Best Practices

1. **Verwende Konstanten**: Translation-Keys sollten in SCREAMING_SNAKE_CASE sein
2. **Gruppiere logisch**: Erstelle klare Kategorien (AUTH, CHAT, etc.)
3. **Vermeide Duplikate**: Nutze COMMON für wiederkehrende Begriffe
4. **Teste beide Sprachen**: Stelle sicher, dass beide Sprachen aktuell sind
5. **Verwende die Pipe in Templates**: `{{ 'KEY' | t }}` ist einfacher als Service-Calls

## Migration von alten Translations

Falls du von `@ngx-translate` oder anderen Libraries migrierst:

```typescript
// Alt (ngx-translate)
this.translate.get('auth.login').subscribe((text) => console.log(text));

// Neu (DABubble i18n)
const text = this.i18n.t('AUTH.LOGIN');
console.log(text);
```

## Performance

- ✅ Keine HTTP-Requests
- ✅ Tree-shaking möglich
- ✅ Compile-Zeit Type-Checking
- ✅ Signal-basiert = Optimal für Angular Change Detection
- ✅ Translations werden nur einmal geladen

## Erweiterungen

### Mehrere Dateien für Übersetzungen

Wenn die Translations zu groß werden:

```typescript
// translations/auth.ts
export const authTranslations = {
  de: {
    /* ... */
  },
  en: {
    /* ... */
  },
};

// translations/chat.ts
export const chatTranslations = {
  de: {
    /* ... */
  },
  en: {
    /* ... */
  },
};

// translations/index.ts
export const translations = {
  de: {
    ...authTranslations.de,
    ...chatTranslations.de,
  },
  en: {
    ...authTranslations.en,
    ...chatTranslations.en,
  },
};
```

## Support

Bei Fragen oder Problemen: DABubble Team
