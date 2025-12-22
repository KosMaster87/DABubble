# Shared Module

Wiederverwendbare Components, Pipes, Directives und Utilities.

## 📁 Struktur

```
shared/
├── components/              ← Reusable UI Components
│   ├── input-field/         ← Form Input Component
│   ├── primary-button/      ← Primary Button Component
│   ├── dabubble-logo/       ← App Logo Component
│   ├── legal-information/   ← Footer Legal Links
│   └── ...
├── pipes/                   ← Transformation Pipes
├── directives/              ← Custom Directives
├── validators/              ← Form Validators
├── animations/              ← Angular Animations
└── utils/                   ← Helper Functions
```

## 🎯 Zweck

Der `shared/` Ordner enthält **wiederverwendbare Bausteine**, die:

- In **mehreren Features** genutzt werden
- **Keine Business-Logik** enthalten (presentational)
- **Generisch** und **konfigurierbar** sind
- **Domain-agnostic** sind (nicht feature-spezifisch)

---

## 📋 Components

### InputFieldComponent

**Zweck**: Wiederverwendbares Input-Feld mit Label und Error-Handling

**API**:

```typescript
@Input() label: string;
@Input() type: 'text' | 'email' | 'password' | 'tel';
@Input() placeholder: string;
@Input() errorMessage: string;
@Input() showError: boolean;
```

**Verwendung**:

```html
<app-input-field
  label="Email"
  type="email"
  placeholder="your@email.com"
  [errorMessage]="emailError()"
  [showError]="emailInvalid()"
/>
```

---

### PrimaryButtonComponent

**Zweck**: Primärer Action-Button mit Loading-State

**API**:

```typescript
@Input() text: string;
@Input() disabled: boolean;
@Input() loading: boolean;
@Input() type: 'button' | 'submit';
@Output() clicked = new EventEmitter<void>();
```

**Verwendung**:

```html
<app-primary-button
  text="Sign In"
  type="submit"
  [disabled]="form.invalid"
  [loading]="isSubmitting()"
  (clicked)="onSubmit()"
/>
```

---

### DABubbleLogoComponent

**Zweck**: App-Logo mit optionalem Link

**API**:

```typescript
@Input() size: 'small' | 'medium' | 'large';
@Input() link: string;
```

**Verwendung**:

```html
<app-dabubble-logo size="large" link="/dashboard" />
```

---

### LegalInformationComponent

**Zweck**: Footer mit Imprint & Privacy Links

**Verwendung**:

```html
<app-legal-information />
```

**Output**:

```
Imprint | Privacy Policy
```

---

## 🔄 Pipes

### TranslatePipe

**Zweck**: i18n Template Pipe

**Verwendung**:

```html
<h1>{{ 'auth.welcome' | translate }}</h1>
```

---

## 🎨 Animations

### slideDownAnimation

**Zweck**: Slide-Down Entrance Animation

**Verwendung**:

```typescript
@Component({
  animations: [slideDownAnimation],
})
```

```html
<div @slideDown>Content</div>
```

---

## ✅ Validators

### Custom Form Validators

```typescript
// Password Strength
Validators.minLength(6)

// Email Format
Validators.email

// Custom Validators
customValidator(control: AbstractControl): ValidationErrors | null
```

---

## 🛠️ Utils

### Helper Functions

```typescript
// Date Formatting
formatDate(date: Date): string

// String Manipulation
capitalize(str: string): string

// Array Helpers
groupBy<T>(array: T[], key: string): Record<string, T[]>
```

---

## 📝 Best Practices

### Component Creation

✅ **DO**: Erstelle generische, wiederverwendbare Components
✅ **DO**: Nutze `@Input()` und `@Output()` für Konfigurierbarkeit
✅ **DO**: Halte Components klein (≤ 14 Zeilen pro Funktion)
✅ **DO**: Dokumentiere API mit JSDoc

❌ **DON'T**: Nutze Feature-spezifische Logik
❌ **DON'T**: Inject Feature-spezifische Services
❌ **DON'T**: Referenziere andere Features

### Naming Convention

- **Component**: `[Name]Component` (e.g., `InputFieldComponent`)
- **Selector**: `app-[name]` (e.g., `app-input-field`)
- **File**: `[name].component.ts` (e.g., `input-field.component.ts`)

---

## 🔗 Imports

Shared Components werden in Features importiert:

```typescript
import { InputFieldComponent } from '@shared/components/input-field';
import { PrimaryButtonComponent } from '@shared/components/primary-button';
```

Oder per Barrel Export:

```typescript
import { InputFieldComponent, PrimaryButtonComponent } from '@shared/components';
```

---

## 📊 Component Overview

| Component                   | Purpose       | Inputs | Outputs |
| --------------------------- | ------------- | ------ | ------- |
| `InputFieldComponent`       | Form Input    | 5      | 0       |
| `PrimaryButtonComponent`    | Action Button | 4      | 1       |
| `DABubbleLogoComponent`     | App Logo      | 2      | 0       |
| `LegalInformationComponent` | Footer Links  | 0      | 0       |

---

**Version:** 1.0
**Last Updated:** December 2025
**Project:** DABubble
