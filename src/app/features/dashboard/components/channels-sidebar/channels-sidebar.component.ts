/**
 * @fileoverview Channels Sidebar Component
 * @description Collapsible sidebar showing channels list
 * @module features/dashboard/components/channels-sidebar
 */

import { Component, inject, output, input, signal } from '@angular/core';
import { ChannelStore } from '@stores/channel.store';
import { CommonModule } from '@angular/common';
import { WorkspaceSidebarService } from '@shared/services/workspace-sidebar.service';

@Component({
  selector: 'app-channels-sidebar',
  imports: [CommonModule],
  templateUrl: './channels-sidebar.component.html',
  styleUrl: './channels-sidebar.component.scss',
})
export class ChannelsSidebarComponent {
  protected channelStore = inject(ChannelStore);
  protected sidebarService = inject(WorkspaceSidebarService);
  isNewMessageActive = input<boolean>(false);
  newMessageRequested = output<void>();
  protected isChannelsOpen = signal(true);
  protected isDirectMessagesOpen = signal(true);

  /**
   * Dummy channels data
   */
  protected dummyChannels = signal([
    {
      id: '1',
      name: 'Entwicklung',
    },
    {
      id: '2',
      name: 'Marketing',
    },
  ]);

  /**
   * Selected channel ID
   */
  protected selectedChannelId = signal<string | null>(null);

  /**
   * Dummy direct messages data
   */
  protected directMessages = signal([
    {
      id: '1',
      name: 'Sofia Müller',
      avatar: '/img/profile/profile-1.png',
      isOnline: true,
    },
    {
      id: '2',
      name: 'Noah Braun',
      avatar: '/img/profile/profile-2.png',
      isOnline: false,
    },
  ]);

  /**
   * Selected direct message ID
   */
  protected selectedDirectMessageId = signal<string | null>(null);

  /**
   * Open new message view
   */
  openNewMessage(): void {
    this.newMessageRequested.emit();
  }

  /**
   * Toggle channels dropdown
   */
  toggleChannels(): void {
    this.isChannelsOpen.update((value) => !value);
  }

  /**
   * Toggle direct messages dropdown
   */
  toggleDirectMessages(): void {
    this.isDirectMessagesOpen.update((value) => !value);
  }

  /**
   * Select a channel
   */
  selectChannel(channelId: string): void {
    const channel = this.channelStore.channels().find((ch) => ch.id === channelId);
    if (channel) {
      this.channelStore.selectChannel(channel);
    }
  }

  /**
   * Select a dummy channel
   */
  selectDummyChannel(channelId: string): void {
    this.selectedChannelId.set(channelId);
  }

  /**
   * Add new channel
   */
  addChannel(): void {
    console.log('Add channel clicked');
    // TODO: Implement add channel logic
  }

  /**
   * Select a direct message
   */
  selectDirectMessage(messageId: string): void {
    this.selectedDirectMessageId.set(messageId);
  }
}
