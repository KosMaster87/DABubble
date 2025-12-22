# Stores Module

NgRx SignalStore State Management für DABubble.

## 📁 Struktur

```
stores/
├── auth/                          ← Authentication Store (Modular)
│   ├── auth.store.ts              # Main store integration
│   ├── auth.types.ts              # State interface & initial state
│   ├── auth.helpers.ts            # Mapper & utility functions
│   ├── auth.login.methods.ts      # Login methods (Email, Google, Anonymous)
│   ├── auth.signup.methods.ts     # Signup & verification
│   ├── auth.password.methods.ts   # Password reset/recovery
│   └── index.ts                   # Barrel export
├── user.store.ts                  ← User Management Store
├── user-presence.store.ts         ← Online Status Store
├── channel.store.ts               ← Channel Management Store
├── channel-member.store.ts        ← Channel Membership Store
├── message.store.ts               ← Message CRUD Store
├── channel-message.store.ts       ← Channel Messages Store
├── direct-message.store.ts        ← Direct Messages Store
├── store.utils.ts                 ← Store Utilities
└── index.ts                       ← Central Barrel Export
```

---

## 🎯 Zweck

Stores verwalten den **globalen Application State** mit:

- **Signals**: Reactive State Management
- **NgRx SignalStore**: Type-safe Store Factory
- **Firebase Integration**: Real-time listeners
- **Modular Structure**: Separated concerns (auth/ folder)

---

## 📦 Auth Store (Modular Structure)

### Warum Modular?

**Vorteile**:

- ✅ **Single Responsibility**: Jede Datei hat eine klare Aufgabe
- ✅ **Testability**: Methoden isoliert testbar
- ✅ **Maintainability**: Änderungen betreffen nur relevante Dateien
- ✅ **Scalability**: Einfach neue Features hinzufügen
- ✅ **File Size**: Jede Datei ≤ 100 Zeilen (Project Standards)

### Datei-Übersicht

#### `auth.types.ts` (27 Zeilen)

```typescript
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};
```

**Zweck**: Type Definitions & Initial State

---

#### `auth.helpers.ts` (74 Zeilen)

```typescript
export const mapFirebaseUserToUser = (firebaseUser: FirebaseUser): User => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email || '',
  displayName: firebaseUser.displayName || '',
  photoURL: firebaseUser.photoURL || undefined,
  isOnline: true,
  lastSeen: new Date(),
  channels: [],
  directMessages: [],
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const createAuthStateHandlers = (store: any) => ({
  handleUserAuthenticated: (firebaseUser: FirebaseUser) => {
    /*...*/
  },
  handleUserLoggedOut: () => {
    /*...*/
  },
  handleSuccessfulAuth: (firebaseUser: FirebaseUser) => {
    /*...*/
  },
  handleAuthError: (error: unknown, defaultMessage: string) => {
    /*...*/
  },
});
```

**Zweck**: Mapper Functions & State Handlers

---

#### `auth.login.methods.ts` (93 Zeilen)

```typescript
export const createLoginMethods = (auth, store, handlers) => ({
  async loginWithEmail(email: string, password: string): Promise<void> {
    await performLogin(
      () => signInWithEmailAndPassword(auth, email, password),
      store,
      handlers.handleSuccessfulAuth,
      handlers.handleAuthError
    );
  },

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await performLogin(
      () => signInWithPopup(auth, provider), // Popup (kein Redirect!)
      store,
      handlers.handleSuccessfulAuth,
      handlers.handleAuthError
    );
  },

  async loginAnonymously(): Promise<void> {
    /*...*/
  },
  async logout(): Promise<void> {
    /*...*/
  },
});
```

**Zweck**: Login/Logout Methods (Email, Google OAuth Popup, Anonymous)

**Note**: Google OAuth nutzt `signInWithPopup` (nicht Redirect) für bessere Kompatibilität

---

#### `auth.signup.methods.ts` (58 Zeilen)

```typescript
export const createSignupMethods = (auth, store, handlers) => ({
  async signup(email: string, password: string, displayName: string): Promise<void> {
    // Registration logic
  },

  async verifyEmail(code: string): Promise<void> {
    // Email verification
  },

  async updateUserProfile(profile: { displayName?: string; photoURL?: string }): Promise<void> {
    // Profile update
  },
});
```

**Zweck**: Signup & Verification Methods

---

#### `auth.password.methods.ts` (32 Zeilen)

```typescript
export const createPasswordMethods = (auth: Auth) => ({
  async sendPasswordResetEmail(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  },

  async confirmPasswordReset(code: string, newPassword: string): Promise<void> {
    await confirmPasswordReset(auth, code, newPassword);
  },
});
```

**Zweck**: Password Reset/Recovery Methods

---

#### `auth.store.ts` (72 Zeilen)

```typescript
export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialAuthState),
  withComputed((store) => ({
    isLoggedIn: computed(() => store.isAuthenticated() && store.user() !== null),
    userDisplayName: computed(() => store.user()?.displayName || 'Anonymous'),
    userEmail: computed(() => store.user()?.email || ''),
    hasError: computed(() => store.error() !== null),
  })),
  withMethods((store) => {
    const auth = inject(Auth);
    const handlers = createAuthStateHandlers(store);

    // Setup Firebase Auth Listener
    onAuthStateChanged(auth, (firebaseUser) => {
      firebaseUser
        ? handlers.handleUserAuthenticated(firebaseUser)
        : handlers.handleUserLoggedOut();
    });

    // Combine all method groups
    const loginMethods = createLoginMethods(auth, store, handlers);
    const signupMethods = createSignupMethods(auth, store, handlers);
    const passwordMethods = createPasswordMethods(auth);

    return {
      ...loginMethods,
      ...signupMethods,
      ...passwordMethods,
      setLoading: (isLoading: boolean) => patchState(store, { isLoading }),
      setError: (error: string | null) => patchState(store, { error }),
      clearError: () => patchState(store, { error: null }),
    };
  })
);
```

**Zweck**: Main Store - Integration aller Methoden

---

## 📊 Store API

### AuthStore

**State**:

```typescript
user: Signal<User | null>;
isAuthenticated: Signal<boolean>;
isLoading: Signal<boolean>;
error: Signal<string | null>;
```

**Computed**:

```typescript
isLoggedIn: Signal<boolean>;
userDisplayName: Signal<string>;
userEmail: Signal<string>;
hasError: Signal<boolean>;
```

**Methods**:

```typescript
// Login
loginWithEmail(email: string, password: string): Promise<void>
loginWithGoogle(): Promise<void>
loginAnonymously(): Promise<void>
logout(): Promise<void>

// Signup
signup(email: string, password: string, displayName: string): Promise<void>
verifyEmail(code: string): Promise<void>
updateUserProfile(profile): Promise<void>

// Password
sendPasswordResetEmail(email: string): Promise<void>
confirmPasswordReset(code: string, newPassword: string): Promise<void>

// Utility
setLoading(isLoading: boolean): void
setError(error: string | null): void
clearError(): void
```

---

## 🔄 Usage Example

```typescript
import { Component, inject } from '@angular/core';
import { AuthStore } from '@stores/auth';

@Component({
  selector: 'app-dashboard',
  template: `
    @if (authStore.isLoggedIn()) {
    <h1>Welcome {{ authStore.userDisplayName() }}</h1>
    <button (click)="logout()">Logout</button>
    }
  `,
})
export class DashboardComponent {
  protected authStore = inject(AuthStore);

  async logout() {
    await this.authStore.logout();
  }
}
```

---

## 📝 Barrel Exports

### Central Export (`stores/index.ts`)

```typescript
// Store exports
export { AuthStore } from './auth';
export { UserStore } from './user.store';
export { ChannelStore } from './channel.store';

// Type exports (required by isolatedModules compiler option)
export type { AuthState } from './auth';
export type { UserState } from './user.store';
export type { ChannelState } from './channel.store';
```

**Why `export type`?**

**`isolatedModules: true`** in `tsconfig.json` enforces:

- TypeScript compiles each file in isolation
- Compiler cannot determine if export is type or value
- `export type` makes it explicit (type-only export)
- Required for build tools like esbuild, Babel, swc

**Import Examples**:

```typescript
// Option 1: Direct from auth
import { AuthStore, AuthState } from '@stores/auth';

// Option 2: Central import
import { AuthStore } from '@stores';
import type { AuthState } from '@stores'; // Type-only import
```

---

## 🎨 Signal Store Pattern

### withState()

Konvertiert Plain Object → Reactive Signals:

```typescript
// Input (Plain Object)
const initialState = {
  user: null,
  isAuthenticated: false,
};

// Output (Reactive Signals)
withState(initialState);
// →
{
  user: Signal<User | null>;
  isAuthenticated: Signal<boolean>;
}
```

**Reaktivität**:

```typescript
patchState(store, { user: newUser });
// ✅ Alle Components mit user() werden automatisch aktualisiert
```

---

### withComputed()

Derived State aus anderen Signals:

```typescript
withComputed((store) => ({
  isLoggedIn: computed(() => store.isAuthenticated() && store.user() !== null),
}));
```

---

### withMethods()

Store Methods mit Zugriff auf State:

```typescript
withMethods((store) => ({
  async login(email: string, password: string) {
    patchState(store, { isLoading: true });
    // Login logic...
    patchState(store, { user: newUser, isAuthenticated: true, isLoading: false });
  },
}));
```

---

## ✅ Best Practices

### Store Organization

✅ **DO**: Trenne große Stores in Feature-Ordner (auth/)
✅ **DO**: Max 100 Zeilen pro Datei
✅ **DO**: Nutze Barrel Exports (index.ts)
✅ **DO**: Dokumentiere alle Public Methods

❌ **DON'T**: Erstelle monolithische Store-Dateien
❌ **DON'T**: Mische Business Logic mit State Logic
❌ **DON'T**: Nutze `any` Types

---

### Method Naming

- **CRUD**: `create`, `read`, `update`, `delete`
- **Actions**: `login`, `logout`, `send`, `fetch`
- **Setters**: `setUser`, `setLoading`, `setError`
- **Async**: `async` prefix für Promise-Methods

---

## 🔗 Related Documentation

- [Core README](../core/CORE-README.md) - Guards & Services
- [Features README](../features/FEATURES-README.md) - Feature Modules
- [Copilot Prompt](../../.github/prompts/copilot-angular.prompt.md) - Development Standards

---

**Version:** 1.0
**Last Updated:** December 2025
**Project:** DABubble
