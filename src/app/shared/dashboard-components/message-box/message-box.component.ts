/**
 * @fileoverview Message Box Component
 * @description Reusable message input box with emoji, mention, and send functionality
 * @module shared/dashboard-components/message-box
 */

import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-box',
  imports: [FormsModule],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.scss',
})
export class MessageBoxComponent {
  messageSent = output<string>();
  protected message = '';

  /**
   * Send message
   */
  sendMessage(): void {
    if (this.message.trim()) {
      this.messageSent.emit(this.message);
      this.message = '';
    }
  }

  /**
   * Handle emoji picker (placeholder)
   */
  openEmojiPicker(): void {
    console.log('Open emoji picker');
  }

  /**
   * Handle mention picker (placeholder)
   */
  openMentionPicker(): void {
    console.log('Open mention picker');
  }
}
