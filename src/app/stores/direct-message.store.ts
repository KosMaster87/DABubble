/**
 * @fileoverview Direct message management store with NgRx SignalStore
 * Provides state management for direct message operations between users,
 * including conversation handling and real-time messaging.
 * @description This store handles all direct message operations including
 * loading conversations, managing direct message state, and user-to-user messaging.
 * @module DirectMessageStore
 */

import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from '@angular/fire/firestore';
import { Message } from '@core/models/message.model';

/**
 * State interface for direct message management
 * @interface DirectMessageState
 */
export interface DirectMessageState {
  /** Direct messages grouped by conversation ID */
  directMessages: { [conversationId: string]: Message[] };
  /** Currently active conversation ID */
  activeConversationId: string | null;
  /** Loading state indicator */
  isLoading: boolean;
  /** Error message if any */
  error: string | null;
}

/**
 * Initial direct message state
 * @constant {DirectMessageState}
 */
const initialState: DirectMessageState = {
  directMessages: {},
  activeConversationId: null,
  isLoading: false,
  error: null,
};

/**
 * Direct message management store with Firestore integration
 * Provides methods for direct message operations and conversation management
 * @constant {SignalStore}
 */
export const DirectMessageStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    /**
     * Computed function to get direct messages between two users
     * @returns {Signal<Function>} Function that takes user IDs and returns messages array
     */
    getDirectMessagesBetween: computed(() => (user1Id: string, user2Id: string) => {
      const conversationId = [user1Id, user2Id].sort().join('_');
      return store.directMessages()[conversationId] || [];
    }),

    /**
     * Computed property for active conversation messages
     * @returns {Signal<Message[]>} Messages for currently active conversation
     */
    activeConversationMessages: computed(() => {
      const activeId = store.activeConversationId();
      return activeId ? store.directMessages()[activeId] || [] : [];
    }),

    /**
     * Computed property for direct message count
     * @returns {Signal<number>} Total number of direct messages
     */
    directMessageCount: computed(() => {
      return Object.values(store.directMessages()).reduce(
        (total, messages) => total + messages.length,
        0
      );
    }),

    /**
     * Computed property for conversation count
     * @returns {Signal<number>} Number of active conversations
     */
    conversationCount: computed(() => Object.keys(store.directMessages()).length),
  })),
  withMethods((store) => {
    const firestore = inject(Firestore);
    const messagesCollection = collection(firestore, 'messages');

    return {
      // === ENTRY POINT METHODS ===

      /**
       * Entry point: Load direct messages between two users
       * @async
       * @function loadDirectMessages
       * @param {string} user1Id - First user ID
       * @param {string} user2Id - Second user ID
       * @param {number} messageLimit - Maximum number of messages to load
       * @returns {Promise<void>}
       */
      async loadDirectMessages(user1Id: string, user2Id: string, messageLimit = 50) {
        await this.performLoadDirectMessages(user1Id, user2Id, messageLimit);
      },

      /**
       * Entry point: Set active conversation
       * @function setActiveConversation
       * @param {string | null} conversationId - Conversation ID to set as active
       */
      setActiveConversation(conversationId: string | null) {
        patchState(store, { activeConversationId: conversationId });
      },

      /**
       * Entry point: Add message to conversation
       * @function addMessageToConversation
       * @param {string} conversationId - Conversation ID
       * @param {Message} message - Message to add
       */
      addMessageToConversation(conversationId: string, message: Message) {
        this.performAddMessageToConversation(conversationId, message);
      },

      // === IMPLEMENTATION METHODS ===

      /**
       * Implementation: Load direct messages from Firestore
       * @async
       * @function performLoadDirectMessages
       * @param {string} user1Id - First user ID
       * @param {string} user2Id - Second user ID
       * @param {number} messageLimit - Maximum number of messages to load
       * @returns {Promise<void>}
       */
      async performLoadDirectMessages(user1Id: string, user2Id: string, messageLimit: number) {
        patchState(store, { isLoading: true });
        try {
          const conversationId = this.generateConversationId(user1Id, user2Id);
          const q = this.buildDirectMessageQuery(user1Id, user2Id, messageLimit);
          const snapshot = await getDocs(q);
          const messages = this.mapMessagesFromSnapshot(snapshot);
          this.updateDirectMessages(conversationId, messages);
        } catch (error) {
          this.handleError(error, 'Failed to load direct messages');
        }
      },

      /**
       * Implementation: Add message to conversation state
       * @function performAddMessageToConversation
       * @param {string} conversationId - Conversation ID
       * @param {Message} message - Message to add
       */
      performAddMessageToConversation(conversationId: string, message: Message) {
        const directMessages = store.directMessages()[conversationId] || [];
        this.updateDirectMessages(conversationId, [message, ...directMessages]);
      },

      // === HELPER FUNCTIONS ===

      /**
       * Generate conversation ID from two user IDs
       * @function generateConversationId
       * @param {string} user1Id - First user ID
       * @param {string} user2Id - Second user ID
       * @returns {string} Conversation ID
       */
      generateConversationId(user1Id: string, user2Id: string): string {
        return [user1Id, user2Id].sort().join('_');
      },

      /**
       * Build Firestore query for direct messages
       * @function buildDirectMessageQuery
       * @param {string} user1Id - First user ID
       * @param {string} user2Id - Second user ID
       * @param {number} messageLimit - Message limit
       * @returns {any} Firestore query
       */
      buildDirectMessageQuery(user1Id: string, user2Id: string, messageLimit: number): any {
        return query(
          messagesCollection,
          where('recipientId', 'in', [user1Id, user2Id]),
          where('authorId', 'in', [user1Id, user2Id]),
          orderBy('createdAt', 'desc'),
          limit(messageLimit)
        );
      },

      /**
       * Map Firestore snapshot to Message array
       * @function mapMessagesFromSnapshot
       * @param {any} snapshot - Firestore query snapshot
       * @returns {Message[]} Array of message objects
       */
      mapMessagesFromSnapshot(snapshot: any): Message[] {
        return snapshot.docs.map(
          (doc: any) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Message)
        );
      },

      /**
       * Update direct messages in state
       * @function updateDirectMessages
       * @param {string} conversationId - Conversation ID
       * @param {Message[]} messages - Messages to update
       */
      updateDirectMessages(conversationId: string, messages: Message[]) {
        patchState(store, {
          directMessages: {
            ...store.directMessages(),
            [conversationId]: messages,
          },
          isLoading: false,
        });
      },

      /**
       * Update direct messages with changes
       * @function updateDirectMessagesWithChanges
       * @param {string} messageId - Message ID to update
       * @param {Partial<Message>} updates - Updates to apply
       * @returns {object} Updated direct messages
       */
      updateDirectMessagesWithChanges(messageId: string, updates: Partial<Message>): any {
        const updatedDirectMessages = { ...store.directMessages() };
        Object.keys(updatedDirectMessages).forEach((conversationId) => {
          updatedDirectMessages[conversationId] = updatedDirectMessages[conversationId].map((msg) =>
            msg.id === messageId ? { ...msg, ...updates } : msg
          );
        });
        return updatedDirectMessages;
      },

      /**
       * Handle errors and update state
       * @function handleError
       * @param {unknown} error - Error object
       * @param {string} defaultMessage - Default error message
       */
      handleError(error: unknown, defaultMessage: string) {
        const errorMessage = error instanceof Error ? error.message : defaultMessage;
        patchState(store, { error: errorMessage, isLoading: false });
      },

      // === STATE MANAGEMENT HELPERS ===

      /**
       * Set loading state
       * @function setLoading
       * @param {boolean} isLoading - Loading state
       */
      setLoading(isLoading: boolean) {
        patchState(store, { isLoading });
      },

      /**
       * Set error message
       * @function setError
       * @param {string | null} error - Error message or null to clear
       */
      setError(error: string | null) {
        patchState(store, { error });
      },

      /**
       * Clear error message
       * @function clearError
       */
      clearError() {
        patchState(store, { error: null });
      },
    };
  })
);
