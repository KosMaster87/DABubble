/**
 * @fileoverview Add Member Button Component
 * @description Button to add new members to channel/chat
 * @module shared/dashboard-components/add-member-button
 */

import { Component, output } from '@angular/core';

@Component({
  selector: 'app-add-member-button',
  imports: [],
  templateUrl: './add-member-button.component.html',
  styleUrl: './add-member-button.component.scss',
})
export class AddMemberButtonComponent {
  addMemberClicked = output<void>();

  /**
   * Handle button click
   */
  onClick(): void {
    this.addMemberClicked.emit();
  }
}
