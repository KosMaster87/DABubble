/**
 * @fileoverview Channel management store with NgRx SignalStore
 * Provides state management for channel CRUD operations, member management,
 * and channel subscriptions with Firebase Firestore integration.
 * @description This store handles all channel-related operations including creation,
 * updates, deletion, member management, and real-time channel subscriptions.
 * @module ChannelStore
 */

import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Firestore, collection, doc, getDocs, addDoc, updateDoc } from '@angular/fire/firestore';

import { Channel, CreateChannelRequest } from '@core/models/channel.model';

/**
 * State interface for channel management
 * @interface ChannelState
 */
export interface ChannelState {
  /** Array of all channels */
  channels: Channel[];
  /** Currently selected channel */
  selectedChannel: Channel | null;
  /** User's joined channels */
  myChannels: Channel[];
  /** Available public channels */
  publicChannels: Channel[];
  /** Loading state indicator */
  isLoading: boolean;
  /** Error message if any */
  error: string | null;
}

/**
 * Initial channel state
 * @constant {ChannelState}
 */
const initialState: ChannelState = {
  channels: [],
  selectedChannel: null,
  myChannels: [],
  publicChannels: [],
  isLoading: false,
  error: null,
};

/**
 * Channel management store with Firestore integration
 * Provides methods for channel CRUD operations and member management
 * @constant {SignalStore}
 */
export const ChannelStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    /**
     * Computed property for total channel count
     * @returns {Signal<number>} Number of channels
     */
    channelCount: computed(() => store.channels().length),

    /**
     * Computed property for user channel count
     * @returns {Signal<number>} Number of user's channels
     */
    userChannelCount: computed(() => store.myChannels().length),

    /**
     * Computed function to get channel by ID
     * @returns {Signal<Function>} Function that takes id and returns channel or undefined
     */
    getChannelById: computed(
      () => (id: string) => store.channels().find((channel) => channel.id === id)
    ),

    /**
     * Computed function to get public channels
     * @returns {Signal<Function>} Function that returns array of public channels
     */
    getPublicChannels: computed(() => store.channels().filter((channel) => !channel.isPrivate)),

    /**
     * Computed function to get private channels
     * @returns {Signal<Function>} Function that returns array of private channels
     */
    getPrivateChannels: computed(() => store.channels().filter((channel) => channel.isPrivate)),
  })),
  withMethods((store) => {
    const firestore = inject(Firestore);
    const channelsCollection = collection(firestore, 'channels');

    return {
      // === ENTRY POINT METHODS ===

      /**
       * Entry point: Load all channels or user-specific channels
       * @async
       * @function loadChannels
       * @param {string} userId - Optional user ID to filter channels
       * @returns {Promise<void>}
       */
      async loadChannels(userId?: string) {
        await this.performLoad(userId);
      },

      /**
       * Entry point: Create new channel
       * @async
       * @function createChannel
       * @param {CreateChannelRequest} channelData - Channel data to create
       * @param {string} createdBy - User ID of channel creator
       * @returns {Promise<void>}
       */
      async createChannel(channelData: CreateChannelRequest, createdBy: string) {
        await this.performCreate(channelData, createdBy);
      },

      /**
       * Entry point: Update channel data
       * @async
       * @function updateChannel
       * @param {string} channelId - Channel ID to update
       * @param {Partial<Channel>} updates - Data to update
       * @returns {Promise<void>}
       */
      async updateChannel(channelId: string, updates: Partial<Channel>) {
        await this.performUpdate(channelId, updates);
      },

      // === IMPLEMENTATION METHODS ===

      /**
       * Implementation: Load channels from Firestore
       * @async
       * @function performLoad
       * @param {string} userId - Optional user ID to filter channels
       * @returns {Promise<void>}
       */
      async performLoad(userId?: string) {
        patchState(store, { isLoading: true });
        try {
          const snapshot = await getDocs(channelsCollection);
          const channels = this.mapChannelsFromSnapshot(snapshot);
          const userChannels = this.filterUserChannels(channels, userId);
          patchState(store, { channels, myChannels: userChannels, isLoading: false });
        } catch (error) {
          this.handleError(error, 'Failed to load channels');
        }
      },

      /**
       * Implementation: Create new channel in Firestore
       * @async
       * @function performCreate
       * @param {CreateChannelRequest} channelData - Channel data to create
       * @param {string} createdBy - User ID of channel creator
       * @returns {Promise<void>}
       */
      async performCreate(channelData: CreateChannelRequest, createdBy: string) {
        patchState(store, { isLoading: true, error: null });
        try {
          const newChannel = this.buildChannelData(channelData, createdBy);
          const docRef = await addDoc(channelsCollection, newChannel);
          const channel = { ...newChannel, id: docRef.id };
          patchState(store, { channels: [...store.channels(), channel], isLoading: false });
        } catch (error) {
          this.handleError(error, 'Failed to create channel');
        }
      },

      /**
       * Implementation: Update channel in Firestore
       * @async
       * @function performUpdate
       * @param {string} channelId - Channel ID to update
       * @param {Partial<Channel>} updates - Data to update
       * @returns {Promise<void>}
       */
      async performUpdate(channelId: string, updates: Partial<Channel>) {
        try {
          const channelDoc = doc(channelsCollection, channelId);
          await updateDoc(channelDoc, { ...updates, updatedAt: new Date() });
          this.updateChannelInState(channelId, updates);
        } catch (error) {
          this.handleError(error, 'Failed to update channel');
        }
      },

      // === HELPER FUNCTIONS ===

      /**
       * Map Firestore snapshot to Channel array
       * @function mapChannelsFromSnapshot
       * @param {any} snapshot - Firestore query snapshot
       * @returns {Channel[]} Array of channel objects
       */
      mapChannelsFromSnapshot(snapshot: any): Channel[] {
        return snapshot.docs.map(
          (doc: any) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Channel)
        );
      },

      /**
       * Filter channels by user membership
       * @function filterUserChannels
       * @param {Channel[]} channels - Array of all channels
       * @param {string} userId - Optional user ID to filter by
       * @returns {Channel[]} Filtered array of user channels
       */
      filterUserChannels(channels: Channel[], userId?: string): Channel[] {
        return userId ? channels.filter((ch) => ch.members.includes(userId)) : [];
      },

      /**
       * Build complete channel data with defaults
       * @function buildChannelData
       * @param {CreateChannelRequest} channelData - Basic channel data
       * @param {string} createdBy - User ID of creator
       * @returns {Omit<Channel, 'id'>} Complete channel data without ID
       */
      buildChannelData(channelData: CreateChannelRequest, createdBy: string): Omit<Channel, 'id'> {
        const now = new Date();
        return {
          ...channelData,
          createdBy,
          admins: [createdBy],
          members: [...channelData.members, createdBy],
          createdAt: now,
          updatedAt: now,
          lastMessageAt: now,
          messageCount: 0,
        };
      },

      /**
       * Find channel by ID in state
       * @function findChannelById
       * @param {string} channelId - Channel ID to find
       * @returns {Channel} Channel object
       * @throws {Error} If channel not found
       */
      findChannelById(channelId: string): Channel {
        const channel = store.channels().find((ch) => ch.id === channelId);
        if (!channel) throw new Error('Channel not found');
        return channel;
      },

      /**
       * Update channel in local state
       * @function updateChannelInState
       * @param {string} channelId - Channel ID to update
       * @param {Partial<Channel>} updates - Updates to apply
       */
      updateChannelInState(channelId: string, updates: Partial<Channel>) {
        patchState(store, {
          channels: store
            .channels()
            .map((channel) => (channel.id === channelId ? { ...channel, ...updates } : channel)),
          error: null,
        });
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
       * Set all channels in state
       * @function setChannels
       * @param {Channel[]} channels - Array of channels to set
       */
      setChannels(channels: Channel[]) {
        patchState(store, { channels, error: null });
      },

      /**
       * Select channel for detailed view
       * @function selectChannel
       * @param {Channel | null} channel - Channel to select or null to deselect
       */
      selectChannel(channel: Channel | null) {
        patchState(store, { selectedChannel: channel });
      },

      /**
       * Set user's channels in state
       * @function setUserChannels
       * @param {Channel[]} userChannels - Array of user channels
       */
      setUserChannels(userChannels: Channel[]) {
        patchState(store, { myChannels: userChannels, error: null });
      },

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
