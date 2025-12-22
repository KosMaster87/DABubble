# Features Module

Feature-basierte Organisation nach Business-Domänen.

## 📁 Struktur

```
features/
├── auth/                      ← Authentifizierung (mit Layout)
│   ├── pages/
│   │   ├── signin/            ← Sign In Page
│   │   ├── signup/            ← Sign Up Page
│   │   ├── password-reset/    ← Password Reset Page
│   │   ├── imprint/           ← Legal: Imprint
│   │   └── privacy-police/    ← Legal: Privacy Policy
│   └── components/
│       └── popup-signup/      ← Signup Popup Component
│
├── chat/                      ← Chat-Feature
│   ├── pages/
│   │   └── chat-page/
│   └── components/
│       ├── message-list/
│       ├── message-input/
│       └── emoji-picker/
│
├── channels/                  ← Channel-Verwaltung
│   ├── pages/
│   │   └── channels-page/
│   └── components/
│       ├── channel-list/
│       └── create-channel/
│
└── profile/                   ← User Profile
    ├── pages/
    │   └── profile-page/
    └── components/
        └── profile-editor/
```

## 🎯 Konzept

Jedes **Feature** ist eine eigenständige Business-Domäne mit:

### `pages/`

- **Routable Components** - Haben eigene Route
- **Container Components** - Orchestrieren Child-Components
- **Smart Components** - Business-Logik & State Management

**Beispiele**: `LoginPage`, `ChatPage`, `ProfilePage`

### `components/`

- **Presentational Components** - Nur Darstellung
- **Wiederverwendbar** innerhalb des Features
- **Dumb Components** - Inputs/Outputs, keine Business-Logik

**Beispiele**: `MessageInput`, `ChannelListItem`, `UserAvatar`

## 📋 Features

### Auth Feature

**Zweck**: Authentifizierung, Registrierung & Passwort-Verwaltung

**Route Structure**:

```typescript
{
  path: 'auth',
  component: AuthLayoutComponent,  // Core Layout Wrapper
  canActivate: [noAuthGuard],      // Redirect if already logged in
  children: [
    { path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'password-reset', component: PasswordResetComponent },
    { path: 'imprint', component: ImprintComponent },
    { path: 'privacy-police', component: PrivacyPoliceComponent },
  ]
}
```

**Pages**:

- **SignInComponent**: Email/Password + Google OAuth Login (Popup)
- **SignUpComponent**: Registrierung mit Email + Password
- **PasswordResetComponent**: Password Recovery Flow
- **ImprintComponent**: Legal Information (Impressum)
- **PrivacyPoliceComponent**: Privacy Policy

**Components**:

- **PopupSignupComponent**: Signup Overlay (von HeaderComponent aufgerufen)

**Authentication Methods** (via AuthStore):

```typescript
// Email/Password
await authStore.loginWithEmail(email, password);
await authStore.signup(email, password, displayName);

// Google OAuth (Popup, kein Redirect!)
await authStore.loginWithGoogle(); // signInWithPopup

// Anonymous/Guest
await authStore.loginAnonymously();

// Logout
await authStore.logout();

// Password Reset
await authStore.sendPasswordResetEmail(email);
await authStore.confirmPasswordReset(code, newPassword);
```

**State Management**:

- Uses `AuthStore` from `@stores/auth` (NgRx SignalStore)
- Modular store structure (auth.store.ts, auth.types.ts, auth.helpers.ts, etc.)

---

### Chat Feature

**Zweck**: Messaging-Funktionalität
**Pages**: ChatPage
**Components**: MessageList, MessageInput, EmojiPicker

---

### Channels Feature

**Zweck**: Channel-Verwaltung
**Pages**: ChannelsPage
**Components**: ChannelList, CreateChannel, ChannelSettings

---

### Profile Feature

**Zweck**: User-Profil Verwaltung
**Pages**: ProfilePage
**Components**: ProfileEditor, AvatarUpload

## 🔧 Verwendung

### Lazy Loading in Routes

```typescript
// app.routes.ts
export const routes: Routes = [
  // Auth Feature with Layout
  {
    path: 'auth',
    loadComponent: () =>
      import('./core/components/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    canActivate: [noAuthGuard],
    children: [
      {
        path: 'signin',
        loadComponent: () =>
          import('./features/auth/pages/signin/signin.component').then((m) => m.SignInComponent),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./features/auth/pages/signup/signup.component').then((m) => m.SignUpComponent),
      },
    ],
  },
  // Protected Routes
  {
    path: 'chat',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/chat/pages/chat-page/chat-page.component').then(
        (m) => m.ChatPageComponent
      ),
  },
];
```

### Feature-Component in Page verwenden

```typescript
// chat-page.component.ts
import { MessageListComponent } from '../../components/message-list/message-list.component';
import { MessageInputComponent } from '../../components/message-input/message-input.component';

@Component({
  imports: [MessageListComponent, MessageInputComponent],
  template: `
    <app-message-list [messages]="messages()" />
    <app-message-input (send)="handleSend($event)" />
  `,
})
export class ChatPageComponent {
  // ...
}
```

## ⚠️ Best Practices

1. **Feature-Isolation** - Features sollten unabhängig sein
2. **Shared Components** → `shared/` - Wenn Component in mehreren Features genutzt wird
3. **Feature-Services** - Feature-spezifische Services im Feature-Ordner
4. **Klare Verantwortlichkeiten** - Page orchestriert, Components präsentieren
5. **Lazy Loading** - Alle Features sollten lazy loaded sein
6. **Auth Layout** - Auth-Pages nutzen `AuthLayoutComponent` als Parent Route
7. **Guards** - `authGuard` für geschützte Routes, `noAuthGuard` für Auth-Pages

---

## 🔗 Related Documentation

- [Core README](../core/CORE-README.md) - AuthLayoutComponent, Guards
- [Stores README](../stores/STORES-README.md) - AuthStore (modular structure)
- [Shared README](../shared/SHARED-README.md) - Reusable UI Components

---

**Version:** 1.1
**Last Updated:** December 2025
**Changes:** Updated Auth Feature structure with Layout, added Google OAuth Popup info

## 🆚 Pages vs. Components

| Aspekt            | Pages   | Components |
| ----------------- | ------- | ---------- |
| Route             | ✅ Ja   | ❌ Nein    |
| Wiederverwendbar  | ❌ Nein | ✅ Ja      |
| Business-Logik    | ✅ Ja   | ❌ Nein    |
| Services injected | ✅ Ja   | ⚠️ Selten  |
| State Management  | ✅ Ja   | ❌ Nein    |

## 📦 Imports

```typescript
// Feature-internal
import { LoginComponent } from '../login/login.component';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';

// Cross-feature (vermeiden! → shared)
import { ButtonComponent } from '@shared/components/buttons/button.component';

// Core Services
import { FirebaseService } from '@core/services/firebase/firebase.service';
```
