# Core Module

Singleton Services, Guards, Models und Interceptors für DABubble.

## 📁 Struktur

```
core/
├── components/        ← Core UI Components
│   ├── auth-layout/   ← Auth Layout Wrapper
│   ├── header/        ← Auth Header Component
│   └── footer/        ← Auth Footer Component
├── services/          ← Application-wide Services
│   ├── firebase/      ← Firebase Services (Auth, Firestore, Storage)
│   └── i18n/          ← Internationalization Service
├── guards/            ← Route Guards (auth, no-auth)
├── models/            ← Domain Models (User, Channel, Message)
└── interceptors/      ← HTTP Interceptors
```

## 🎯 Zweck

Der `core/` Ordner enthält **Singleton-Services** und zentrale Infrastruktur:

- **Components**: Layout-Wrapper für Auth-Seiten (SignIn, SignUp, Password-Reset)
- **Services**: Werden app-weit als Singleton bereitgestellt (`providedIn: 'root'`)
- **Guards**: Route-Guards für Authentifizierung
- **Models**: TypeScript Interfaces & Types für Domain-Objekte
- **Interceptors**: HTTP-Request/Response Manipulation

---

## 🎨 Components

### AuthLayoutComponent

**Zweck**: Layout-Wrapper für alle Authentifizierungs-Seiten
**Verwendung**: Parent Route für /auth/\* Pages

**Features**:

- Responsive Layout für Auth-Pages
- Integrierte Header & Footer Components
- Centered Content Area mit Router Outlet
- Mobile-optimiert

**Template**:

```html
<div class="auth-layout">
  <app-header />
  <main class="auth-layout__content">
    <router-outlet />
  </main>
  <app-footer />
</div>
```

**Route Configuration**:

```typescript
{
  path: 'auth',
  component: AuthLayoutComponent,
  children: [
    { path: 'signin', loadComponent: () => import('./pages/signin/...') },
    { path: 'signup', loadComponent: () => import('./pages/signup/...') },
    { path: 'password-reset', loadComponent: () => import('./pages/password-reset/...') },
  ]
}
```

---

### HeaderComponent

**Zweck**: Auth-Header mit Logo und optional Signup-Popup
**Verwendung**: Persistente Komponente in AuthLayout

**Features**:

- DABubble Logo (klickbar zu /dashboard)
- Signup Button (nur auf SignIn Page)
- Popup-Signup Component Integration
- Responsive Design

**API**:

```typescript
showSignupButton: Signal<boolean>  // Route-basiert (nur auf /auth/signin)
isPopupVisible: Signal<boolean>
showPopup(): void
closePopup(): void
```

---

### FooterComponent

**Zweck**: Footer mit Imprint & Privacy Links
**Verwendung**: Persistente Komponente in AuthLayout

**Features**:

- Legal Information Component Integration
- Responsive Layout
- Fixed bottom positioning

**Template**:

```html
<footer class="auth-footer">
  <app-legal-information />
</footer>
```

---

## 📋 Services

### Firebase Services

- `firebase.service.ts` - Firebase Initialization
- Auth, Firestore, Storage Services

### i18n Service

- `i18n.service.ts` - Type-safe Translations mit Signals
- `translate.pipe.ts` - Template Pipe für Übersetzungen
- `translations.ts` - DE/EN Übersetzungen

## 🔐 Guards

### authGuard

**Zweck**: Schützt Routes vor unauthentifizierten Zugriff
**Verwendung**: Dashboard, Chat, Profile Routes
**Logik**:

- Prüft `AuthStore.isAuthenticated()`
- Redirect zu `/auth/signin` wenn nicht eingeloggt
- Erlaubt Zugriff wenn authenticated

**Implementation**:

```typescript
export const authGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (!authStore.isAuthenticated()) {
    router.navigate(['/auth/signin']);
    return false;
  }
  return true;
};
```

**Route Usage**:

```typescript
{
  path: 'dashboard',
  canActivate: [authGuard],
  loadComponent: () => import('./dashboard/...')
}
```

---

### noAuthGuard

**Zweck**: Verhindert Zugriff auf Auth-Pages wenn bereits eingeloggt
**Verwendung**: SignIn, SignUp, Password-Reset Pages
**Logik**:

- Prüft `AuthStore.isAuthenticated()`
- Redirect zu `/dashboard` wenn eingeloggt
- Erlaubt Zugriff wenn nicht authenticated

**Implementation**:

```typescript
export const noAuthGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (authStore.isAuthenticated()) {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};
```

**Route Usage**:

```typescript
{
  path: 'auth/signin',
  canActivate: [noAuthGuard],
  loadComponent: () => import('./signin/...')
}
```

## 📦 Models

Domain-Modelle für Type-Safety:

- `User` - Benutzer-Daten
- `Channel` - Channel-Informationen
- `Message` - Nachrichten-Struktur
- etc.

## 🔧 Verwendung

### Imports mit Path Aliases

```typescript
// Components
import { AuthLayoutComponent } from '@core/components/auth-layout';
import { HeaderComponent } from '@core/components/header';
import { FooterComponent } from '@core/components/footer';

// Services
import { I18nService } from '@core/services/i18n';
import { FirebaseService } from '@core/services/firebase/firebase.service';

// Guards
import { authGuard } from '@core/guards/auth.guard';
import { noAuthGuard } from '@core/guards/no-auth.guard';

// Models
import { User } from '@core/models/user.model';
```

---

## ⚠️ Best Practices

1. **Keine Feature-spezifischen Services hier** - Die gehören in `features/`
2. **Singleton-Pattern** - Services sind app-weit verfügbar
3. **Type-Safety** - Nutze Models für alle Domain-Objekte
4. **Dependency Injection** - Nutze `inject()` statt Constructor Injection
5. **Layout Components** - Nur für Auth-Layout, nicht für Feature-Layouts

---

## 🔗 Related Documentation

- [Stores README](../stores/STORES-README.md) - NgRx SignalStore (AuthStore)
- [Features README](../features/FEATURES-README.md) - Auth Feature Pages
- [Layout README](../layout/LAYOUT-README.md) - Main Layout Components
- [Shared README](../shared/SHARED-README.md) - Shared UI Components

---

**Version:** 1.1
**Last Updated:** December 2025
**Changes:** Added AuthLayoutComponent, HeaderComponent, FooterComponent documentation
