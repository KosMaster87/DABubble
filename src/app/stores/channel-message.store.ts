/**
 * @fileoverview Channel message management store with NgRx SignalStore
 * Provides state management for channel-specific message operations,
 * including loading, updating, and managing messages within channels.
 * @description This store handles all channel message operations including
 * loading channel messages, real-time updates, and channel message state management.
 * @module ChannelMessageStore
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
 * State interface for channel message management
 * @interface ChannelMessageState
 */
export interface ChannelMessageState {
  /** Messages grouped by channel ID */
  channelMessages: { [channelId: string]: Message[] };
  /** Currently active channel ID */
  activeChannelId: string | null;
  /** Loading state indicator */
  isLoading: boolean;
  /** Error message if any */
  error: string | null;
}

/**
 * Initial channel message state
 * @constant {ChannelMessageState}
 */
const initialState: ChannelMessageState = {
  channelMessages: {},
  activeChannelId: null,
  isLoading: false,
  error: null,
};

/**
 * Channel message management store with Firestore integration
 * Provides methods for channel message operations and state management
 * @constant {SignalStore}
 */
export const ChannelMessageStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    /**
     * Computed function to get messages by channel ID
     * @returns {Signal<Function>} Function that takes channelId and returns messages array
     */
    getMessagesByChannel: computed(
      () => (channelId: string) => store.channelMessages()[channelId] || []
    ),

    /**
     * Computed property for active channel messages
     * @returns {Signal<Message[]>} Messages for currently active channel
     */
    activeChannelMessages: computed(() => {
      const activeId = store.activeChannelId();
      return activeId ? store.channelMessages()[activeId] || [] : [];
    }),

    /**
     * Computed property for channel message count
     * @returns {Signal<number>} Total number of channel messages
     */
    channelMessageCount: computed(() => {
      return Object.values(store.channelMessages()).reduce(
        (total, messages) => total + messages.length,
        0
      );
    }),
  })),
  withMethods((store) => {
    const firestore = inject(Firestore);
    const messagesCollection = collection(firestore, 'messages');

    return {
      // === ENTRY POINT METHODS ===

      /**
       * Entry point: Load messages for a specific channel
       * @async
       * @function loadChannelMessages
       * @param {string} channelId - Channel ID to load messages for
       * @param {number} messageLimit - Maximum number of messages to load
       * @returns {Promise<void>}
       */
      async loadChannelMessages(channelId: string, messageLimit = 50) {
        await this.performLoadChannelMessages(channelId, messageLimit);
      },

      /**
       * Entry point: Set active channel
       * @function setActiveChannel
       * @param {string | null} channelId - Channel ID to set as active
       */
      setActiveChannel(channelId: string | null) {
        patchState(store, { activeChannelId: channelId });
      },

      /**
       * Entry point: Add message to channel
       * @function addMessageToChannel
       * @param {string} channelId - Channel ID
       * @param {Message} message - Message to add
       */
      addMessageToChannel(channelId: string, message: Message) {
        this.performAddMessageToChannel(channelId, message);
      },

      // === IMPLEMENTATION METHODS ===

      /**
       * Implementation: Load channel messages from Firestore
       * @async
       * @function performLoadChannelMessages
       * @param {string} channelId - Channel ID to load messages for
       * @param {number} messageLimit - Maximum number of messages to load
       * @returns {Promise<void>}
       */
      async performLoadChannelMessages(channelId: string, messageLimit: number) {
        patchState(store, { isLoading: true });
        try {
          const q = this.buildChannelQuery(channelId, messageLimit);
          const snapshot = await getDocs(q);
          const messages = this.mapMessagesFromSnapshot(snapshot);
          this.updateChannelMessages(channelId, messages);
        } catch (error) {
          this.handleError(error, 'Failed to load channel messages');
        }
      },

      /**
       * Implementation: Add message to channel state
       * @function performAddMessageToChannel
       * @param {string} channelId - Channel ID
       * @param {Message} message - Message to add
       */
      performAddMessageToChannel(channelId: string, message: Message) {
        const channelMessages = store.channelMessages()[channelId] || [];
        this.updateChannelMessages(channelId, [message, ...channelMessages]);
      },

      // === HELPER FUNCTIONS ===

      /**
       * Build Firestore query for channel messages
       * @function buildChannelQuery
       * @param {string} channelId - Channel ID
       * @param {number} messageLimit - Message limit
       * @returns {any} Firestore query
       */
      buildChannelQuery(channelId: string, messageLimit: number): any {
        return query(
          messagesCollection,
          where('channelId', '==', channelId),
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
       * Update channel messages in state
       * @function updateChannelMessages
       * @param {string} channelId - Channel ID
       * @param {Message[]} messages - Messages to update
       */
      updateChannelMessages(channelId: string, messages: Message[]) {
        patchState(store, {
          channelMessages: {
            ...store.channelMessages(),
            [channelId]: messages,
          },
          isLoading: false,
        });
      },

      /**
       * Update channel messages with changes
       * @function updateChannelMessagesWithChanges
       * @param {string} messageId - Message ID to update
       * @param {Partial<Message>} updates - Updates to apply
       * @returns {object} Updated channel messages
       */
      updateChannelMessagesWithChanges(messageId: string, updates: Partial<Message>): any {
        const updatedChannelMessages = { ...store.channelMessages() };
        Object.keys(updatedChannelMessages).forEach((channelId) => {
          updatedChannelMessages[channelId] = updatedChannelMessages[channelId].map((msg) =>
            msg.id === messageId ? { ...msg, ...updates } : msg
          );
        });
        return updatedChannelMessages;
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
