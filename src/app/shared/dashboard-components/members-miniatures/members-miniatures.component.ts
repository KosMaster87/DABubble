/**
 * @fileoverview Members Miniatures Component
 * @description Displays stacked member avatars with counter
 * @module shared/dashboard-components/members-miniatures
 */

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MemberMiniature {
  id: string;
  name: string;
  avatar: string;
}

@Component({
  selector: 'app-members-miniatures',
  imports: [CommonModule],
  templateUrl: './members-miniatures.component.html',
  styleUrl: './members-miniatures.component.scss',
})
export class MembersMiniatureComponent {
  /**
   * List of members to display (max 3 avatars shown)
   */
  members = input<MemberMiniature[]>([]);

  /**
   * Total member count
   */
  totalCount = input<number>(0);
}
