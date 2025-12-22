---
agent: agent
---

## 💻 DABubble - Angular Development Standards

### Tech Stack

- **Framework:** Angular 21+ (Standalone Components, Signals)
- **Styling:** SCSS + CSS Custom Properties (BEM Methodology)
- **TypeScript:** Strict mode, no `any`
- **State Management:** Signals (`signal()`, `computed()`, `effect()`)
- **Backend:** Firebase (Authentication, Firestore, Storage)
- **Language:** English (code, comments, documentation)

---

## 🎯 Function Rules

Every function must follow these strict guidelines:

- **Maximum 14 lines** per function
- **One clear task** per function
- **No nested functions** (extract to separate functions)
- **Split complex logic** into helper functions
- **Arrow functions** preferred (except constructors/event handlers)
- **Proper TypeScript types** for all parameters and return values
- **Descriptive names:** Short and concise (3-5 words max)
- **camelCase naming:** `getUserById`, not `Get_User_By_ID`

### ✅ Example

```typescript
getUserData(id: string): UserData | null {
  const user = this.findUserById(id);
  if (!user) return null;

  const profile = this.getProfile(user.profileId);
  const settings = this.getSettings(profile.settingsId);

  return this.combineUserData(user, profile, settings);
}

private findUserById(id: string): User | undefined {
  return this.users().find(u => u.id === id);
}
```

---

## 🧩 Component Structure

All components must follow this exact structure:

```typescript
/**
 * @fileoverview [ComponentName] component
 * @description [Brief description of component purpose]
 * @module features/[feature-name]
 */

import { Component, signal, computed, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * [ComponentName] Component
 *
 * @description [Detailed description of what this component does]
 * @example
 * <app-component-name
 *   [prop]="value"
 *   (event)="handler($event)">
 * </app-component-name>
 */
@Component({
  selector: 'app-[name]',
  imports: [CommonModule, RouterLink],
  templateUrl: './[name].component.html',
  styleUrl: './[name].component.scss',
})
export class [Name]Component {
  // Dependency Injection (inject() function)
  private authService = inject(AuthService);
  private router = inject(Router);

  // Inputs (new input() API)
  userId = input.required<string>();
  showDetails = input<boolean>(false);

  // Outputs (new output() API)
  userSelected = output<User>();
  closeDialog = output<void>();

  // Signals (State Management)
  isLoading = signal<boolean>(false);
  currentUser = signal<User | null>(null);
  errorMessage = signal<string>('');

  // Computed Signals (Derived State)
  userName = computed(() => {
    const user = this.currentUser();
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown';
  });

  hasError = computed(() => this.errorMessage().length > 0);

  /**
   * Component initialization
   * @description Loads user data on component init
   */
  constructor() {
    effect(() => {
      const id = this.userId();
      if (id) this.loadUser(id);
    });
  }

  /**
   * Loads user data from service
   * @param id - User ID to load
   * @returns Promise resolving when user is loaded
   */
  async loadUser(id: string): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      const user = await this.authService.getUserById(id);
      this.currentUser.set(user);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Handles errors and sets error message
   * @param error - Error object
   */
  private handleError(error: unknown): void {
    const message = error instanceof Error
      ? error.message
      : 'Unknown error occurred';
    this.errorMessage.set(message);
  }

  /**
   * Emits user selection event
   */
  selectUser(): void {
    const user = this.currentUser();
    if (user) this.userSelected.emit(user);
  }
}
```

---

## 📁 Project Folder Structure

```
src/
├── app/
│   ├── app.config.ts              # App configuration
│   ├── app.routes.ts              # Route definitions
│   ├── app.component.ts           # Root component
│   ├── core/                      # Core module (singleton services)
│   │   ├── guards/                # Route guards
│   │   ├── interceptors/          # HTTP interceptors
│   │   └── services/              # Core services (auth, api)
│   ├── features/                  # Feature modules
│   │   ├── auth/                  # Authentication feature
│   │   │   ├── components/        # Auth components
│   │   │   ├── services/          # Auth services
│   │   │   └── models/            # Auth models
│   │   ├── channels/              # Channels feature
│   │   ├── messages/              # Messages feature
│   │   └── users/                 # Users feature
│   ├── shared/                    # Shared module
│   │   ├── components/            # Reusable components
│   │   ├── directives/            # Custom directives
│   │   ├── pipes/                 # Custom pipes
│   │   └── utils/                 # Utility functions
│   └── models/                    # Global TypeScript interfaces
├── assets/                        # Static assets
│   ├── fonts/                     # Font files
│   │   ├── figtree/               # Figtree font family
│   │   └── nunito/                # Nunito font family
│   └── images/                    # Images and icons
├── environments/                  # Environment configs
│   ├── environment.ts             # Development config
│   ├── environment.prod.ts        # Production config
│   └── environment.example.ts     # Example template
└── styles/                        # Global styles
    ├── _variables.scss            # CSS custom properties
    ├── _mixins.scss               # SCSS mixins
    ├── _fonts.figtree.scss        # Figtree font-face
    ├── _fonts.nunito.scss         # Nunito font-face
    ├── _layout.scss               # Layout utilities
    ├── _typography.scss           # Typography styles
    └── components/                # Component-specific styles
```

---

## 🎨 BEM Naming Convention (SCSS)

**BEM = Block, Element, Modifier**

### Structure

```
.block {}                     // Component/container
.block__element {}            // Child element
.block--modifier {}           // Variation of block
.block__element--modifier {}  // Variation of element
```

### Example

```scss
// Block
.message-card {
  padding: var(--spacing-md);
  background: var(--container-bg);
  border-radius: 8px;

  // Element
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-sm);
  }

  &__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  &__username {
    font-weight: 600;
    color: var(--text-color);
  }

  &__timestamp {
    font-size: var(--font-sm);
    color: var(--text-color-light);
  }

  &__content {
    line-height: 1.5;
    color: var(--text-color);
  }

  // Modifier
  &--highlighted {
    border: 2px solid var(--primary-color);
    box-shadow: 0 0 10px rgba(68, 77, 242, 0.2);
  }

  &--unread {
    background: var(--background-color);
  }
}
```

### HTML Usage

```html
<div class="message-card message-card--highlighted">
  <div class="message-card__header">
    <img class="message-card__avatar" src="avatar.jpg" alt="User" />
    <div>
      <span class="message-card__username">John Doe</span>
      <span class="message-card__timestamp">2 min ago</span>
    </div>
  </div>
  <div class="message-card__content">Hello, this is a message!</div>
</div>
```

---

## 📝 JSDoc Documentation Standards

### Component Documentation

```typescript
/**
 * @fileoverview User profile component
 * @description Displays and manages user profile information
 * @module features/users
 */

/**
 * UserProfile Component
 *
 * @description Renders user profile with editable fields
 * @example
 * <app-user-profile
 *   [userId]="'123'"
 *   (profileUpdated)="handleUpdate($event)">
 * </app-user-profile>
 */
@Component({...})
export class UserProfileComponent {}
```

### Function Documentation

```typescript
/**
 * Updates user profile data
 * @param userId - The unique identifier of the user
 * @param data - Partial user data to update
 * @returns Promise resolving to updated user object
 * @throws {Error} When user not found or update fails
 */
async updateProfile(userId: string, data: Partial<User>): Promise<User> {
  // Implementation
}
```

### Service Documentation

```typescript
/**
 * @fileoverview Authentication service
 * @description Handles user authentication with Firebase
 * @module core/services
 */

/**
 * AuthService
 *
 * @description Manages user authentication state and operations
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  // Implementation
}
```

---

## � NgRx SignalStore Structure

### Modular Store Organization

Stores are organized in feature folders with separate files for logic separation:

```
stores/
  auth/
    ├── auth.store.ts              # Main store (state, computed, integration)
    ├── auth.types.ts              # Interfaces & types
    ├── auth.helpers.ts            # Mapper & utility functions
    ├── auth.login.methods.ts      # Login methods (Email, Google, Anonymous)
    ├── auth.signup.methods.ts     # Signup & verification methods
    ├── auth.password.methods.ts   # Password reset/recovery methods
    └── index.ts                   # Barrel export
  index.ts                         # Central store exports
```

### Store Pattern

```typescript
// auth.types.ts
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

// auth.helpers.ts
export const mapFirebaseUserToUser = (firebaseUser: FirebaseUser): User => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email || '',
  displayName: firebaseUser.displayName || '',
  // ...
});

// auth.login.methods.ts
export const createLoginMethods = (auth: Auth, store: any, handlers: any) => ({
  async loginWithEmail(email: string, password: string): Promise<void> {
    // Login logic (max 14 lines)
  },
  async loginWithGoogle(): Promise<void> {
    // Google OAuth logic
  },
});

// auth.store.ts
export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialAuthState),
  withComputed((store) => ({
    isLoggedIn: computed(() => store.isAuthenticated() && store.user() !== null),
  })),
  withMethods((store) => {
    const auth = inject(Auth);
    const handlers = createAuthStateHandlers(store);
    const loginMethods = createLoginMethods(auth, store, handlers);

    return { ...loginMethods };
  })
);
```

### Barrel Export Pattern

```typescript
// stores/index.ts
export { AuthStore } from './auth';
export { UserStore } from './user.store';

// Type exports (required by isolatedModules)
export type { AuthState } from './auth';
export type { UserState } from './user.store';
```

**Why `export type` is Required:**

**`isolatedModules: true`** in `tsconfig.json` enforces:

- TypeScript compiles **each file in isolation** (without knowing other files)
- Required for **build tools** like esbuild, Babel, swc (used by Angular)
- Compiler cannot determine if export is a **type or value** without context

**Problem without `export type`:**

```typescript
export { AuthStore, AuthState } from './auth';
// ❌ Error: Compiler doesn't know if AuthState is interface or class
```

**Solution with `export type`:**

```typescript
export { AuthStore } from './auth'; // Runtime code
export type { AuthState } from './auth'; // Type-only (removed at runtime)
// ✅ Compiler knows: AuthState is definitely a type
```

**Benefits:**

- ✅ **Build compatibility:** Works with all transpilers
- ✅ **Explicit:** Clear separation of types and runtime code
- ✅ **Tree-shaking:** Types guaranteed to be removed from bundle
- ✅ **Type safety:** Prevents accidental runtime usage of types

---

### Store Organization Benefits:

- ✅ Single Responsibility: Each file has one clear purpose
- ✅ Testability: Methods isolated and easy to unit test
- ✅ Maintainability: Changes don't affect entire store
- ✅ Scalability: Easy to add new features
- ✅ File Size: Each file ≤ 100 lines (meets standards)

---

## �🔥 Firebase Integration

### Environment Configuration

```typescript
// environment.ts
export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'your-project.firebaseapp.com',
    projectId: 'your-project-id',
    storageBucket: 'your-project.appspot.com',
    messagingSenderId: '123456789',
    appId: '1:123456789:web:abcdef',
  },
};
```

### Service Pattern

```typescript
@Injectable({ providedIn: 'root' })
export class MessageService {
  private firestore = inject(Firestore);

  messages = signal<Message[]>([]);

  /**
   * Loads messages from Firestore
   * @param channelId - Channel ID to load messages from
   */
  loadMessages(channelId: string): void {
    const messagesRef = collection(this.firestore, `channels/${channelId}/messages`);
    const q = query(messagesRef, orderBy('timestamp', 'desc'));

    onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Message)
      );
      this.messages.set(messages);
    });
  }
}
```

---

## ✅ Code Quality Checklist

- [ ] TypeScript strict mode enabled
- [ ] No `any` types used
- [ ] All functions ≤ 14 lines
- [ ] All files ≤ 400 LOC
- [ ] BEM naming for all CSS classes
- [ ] JSDoc comments for all public methods
- [ ] Signals for state management
- [ ] `inject()` for dependency injection
- [ ] `input()` / `output()` for component API
- [ ] Standalone components only
- [ ] Proper error handling
- [ ] No console.log in production code

---

**Version:** 1.0
**Last Updated:** December 2025
**Project:** DABubble
