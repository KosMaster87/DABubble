/**
 * @fileoverview Welcome Channel Component
 * @description Main welcome channel view
 * @module features/dashboard/components/welcome-channel
 */

import { Component, signal } from '@angular/core';
import { MessageBoxComponent } from '@shared/dashboard-components/message-box/message-box.component';
import {
  MembersMiniatureComponent,
  type MemberMiniature,
} from '@shared/dashboard-components/members-miniatures/members-miniatures.component';
import { AddMemberButtonComponent } from '@shared/dashboard-components/add-member-button/add-member-button.component';

@Component({
  selector: 'app-welcome-channel',
  imports: [MessageBoxComponent, MembersMiniatureComponent, AddMemberButtonComponent],
  templateUrl: './welcome-channel.component.html',
  styleUrl: './welcome-channel.component.scss',
})
export class WelcomeChannelComponent {
  protected totalMemberCount = signal<number>(3);

  /**
   * Dummy channel members
   */
  protected members = signal<MemberMiniature[]>([
    {
      id: '1',
      name: 'Sofia Müller',
      avatar: '/img/profile/profile-1.png',
    },
    {
      id: '2',
      name: 'Noah Braun',
      avatar: '/img/profile/profile-2.png',
    },
    {
      id: '3',
      name: 'Max Mustermann',
      avatar: '/img/profile/profile-3.png',
    },
  ]);

  /**
   * Handle message sent event
   */
  onMessageSent(message: string): void {
    console.log('Message sent in welcome channel:', message);
    // TODO: Implement message sending logic
  }

  /**
   * Handle add member click
   */
  onAddMember(): void {
    console.log('Add member clicked');
    // TODO: Implement add member dialog
  }
}
