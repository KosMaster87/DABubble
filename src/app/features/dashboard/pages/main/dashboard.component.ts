/**
 * @fileoverview Dashboard Component
 * @description Main dashboard view after authentication
 * @module features/dashboard/pages/main
 */

import { Component, inject, signal } from '@angular/core';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { ChannelsSidebarComponent } from '../../components/channels-sidebar/channels-sidebar.component';
import { WelcomeChannelComponent } from '../../components/welcome-channel/welcome-channel.component';
import { NewMessageComponent } from '../../components/new-message/new-message.component';
import { WorkspaceMenuToggleComponent } from '@shared/dashboard-components';
import { WorkspaceSidebarService } from '@shared/services/workspace-sidebar.service';

type DashboardView = 'welcome' | 'new-message';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardHeaderComponent,
    ChannelsSidebarComponent,
    WelcomeChannelComponent,
    NewMessageComponent,
    WorkspaceMenuToggleComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  protected sidebarService = inject(WorkspaceSidebarService);
  protected currentView = signal<DashboardView>('welcome');

  /**
   * Switch to new message view
   */
  showNewMessage(): void {
    this.currentView.set('new-message');
  }

  /**
   * Switch to welcome view
   */
  showWelcome(): void {
    this.currentView.set('welcome');
  }
}
