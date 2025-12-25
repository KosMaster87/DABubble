/**
 * @fileoverview New Message Component
 * @description Component for composing new messages with search and message box
 * @module features/dashboard/components/new-message
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageBoxComponent } from '@shared/dashboard-components/message-box/message-box.component';

@Component({
  selector: 'app-new-message',
  imports: [FormsModule, MessageBoxComponent],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.scss',
})
export class NewMessageComponent {
  protected searchQuery = '';

  /**
   * Handle message send
   */
  onMessageSent(message: string): void {
    console.log('Message sent:', message);
    // TODO: Implement message sending logic
  }

  /**
   * Handle search
   */
  onSearch(): void {
    console.log('Search for:', this.searchQuery);
    // TODO: Implement recipient search
  }
}
