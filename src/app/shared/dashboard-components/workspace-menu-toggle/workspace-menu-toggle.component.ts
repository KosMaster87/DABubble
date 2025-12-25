/**
 * @fileoverview Workspace Menu Toggle Component
 * @description Toggle button to show/hide the workspace navigation sidebar
 * @module shared/dashboard-components/workspace-menu-toggle
 */

import { Component, inject } from '@angular/core';
import { WorkspaceSidebarService } from '@shared/services/workspace-sidebar.service';

@Component({
  selector: 'app-workspace-menu-toggle',
  imports: [],
  templateUrl: './workspace-menu-toggle.component.html',
  styleUrl: './workspace-menu-toggle.component.scss',
})
export class WorkspaceMenuToggleComponent {
  protected sidebarService = inject(WorkspaceSidebarService);
}
