/**
 * @fileoverview User List Item Component
 * @description Reusable component for displaying user/member items with avatar and name
 * @module shared/dashboard-components/user-list-item
 */

import { Component, input, output } from '@angular/core';

export interface UserListItem {
  id: string;
  name: string;
  avatar: string;
}

@Component({
  selector: 'app-user-list-item',
  imports: [],
  templateUrl: './user-list-item.component.html',
  styleUrl: './user-list-item.component.scss',
})
export class UserListItemComponent {
  user = input.required<UserListItem>();
  isActive = input<boolean>(false);
  itemClicked = output<string>();

  /**
   * Handle click event
   */
  onClick(): void {
    this.itemClicked.emit(this.user().id);
  }
}
