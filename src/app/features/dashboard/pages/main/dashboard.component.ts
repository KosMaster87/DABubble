/**
 * @fileoverview Dashboard Component
 * @description Main dashboard view after authentication
 * @module features/dashboard/pages/main
 */

import { Component, inject } from '@angular/core';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { ChannelsSidebarComponent } from '../../components/channels-sidebar/channels-sidebar.component';
import { WelcomeChannelComponent } from '../../components/welcome-channel/welcome-channel.component';
import { WorkspaceMenuToggleComponent } from '@shared/dashboard-components';
import { WorkspaceSidebarService } from '@shared/services/workspace-sidebar.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardHeaderComponent,
    ChannelsSidebarComponent,
    WelcomeChannelComponent,
    WorkspaceMenuToggleComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  protected sidebarService = inject(WorkspaceSidebarService);
}
