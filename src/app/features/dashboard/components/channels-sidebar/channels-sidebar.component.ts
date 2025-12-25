/**
 * @fileoverview Channels Sidebar Component
 * @description Collapsible sidebar showing channels list
 * @module features/dashboard/components/channels-sidebar
 */

import { Component, signal, inject } from '@angular/core';
import { ChannelStore } from '@stores/channel.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-channels-sidebar',
  imports: [CommonModule],
  templateUrl: './channels-sidebar.component.html',
  styleUrl: './channels-sidebar.component.scss',
})
export class ChannelsSidebarComponent {
  protected channelStore = inject(ChannelStore);
  protected isCollapsed = signal(false);

  /**
   * Toggle sidebar collapse
   */
  toggleSidebar(): void {
    this.isCollapsed.update((value) => !value);
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
}
