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
import { MembersOptionsMenuComponent } from '@shared/dashboard-components/members-options-menu/members-options-menu.component';
import { UserListItem } from '@shared/dashboard-components/user-list-item/user-list-item.component';

@Component({
  selector: 'app-welcome-channel',
  imports: [
    MessageBoxComponent,
    MembersMiniatureComponent,
    AddMemberButtonComponent,
    MembersOptionsMenuComponent,
  ],
  templateUrl: './welcome-channel.component.html',
  styleUrl: './welcome-channel.component.scss',
})
export class WelcomeChannelComponent {
  protected totalMemberCount = signal<number>(3);
  protected isMembersMenuOpen = signal<boolean>(false);

  /**
   * Dummy channel members
   */
  protected members = signal<UserListItem[]>([
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
    this.isMembersMenuOpen.set(true);
  }

  /**
   * Handle view members click
   */
  onViewMembers(): void {
    console.log('View members clicked');
    this.isMembersMenuOpen.set(true);
  }

  /**
   * Handle members menu close
   */
  onCloseMembersMenu(): void {
    this.isMembersMenuOpen.set(false);
  }

  /**
   * Handle member selection from menu
   */
  onMemberSelected(memberId: string): void {
    console.log('Member selected:', memberId);
    // TODO: Implement member detail view or actions
  }
}
