/**
 * @fileoverview User Model Definitions for DABubble
 * @description TypeScript interfaces for User data structures
 * @module UserModel
 */

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isOnline: boolean;
  lastSeen: Date;
  channels: string[]; // Channel IDs where user is member
  directMessages: string[]; // User IDs for direct conversations
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  email: string;
  displayName: string;
  photoURL?: string;
}

export interface UpdateUserRequest {
  displayName?: string;
  photoURL?: string;
  isOnline?: boolean;
  channels?: string[];
  directMessages?: string[];
}

export interface UserPresence {
  uid: string;
  isOnline: boolean;
  lastSeen: Date;
}
