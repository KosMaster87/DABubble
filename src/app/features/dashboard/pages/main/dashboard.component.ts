/**
 * @fileoverview Dashboard Component
 * @description Main dashboard view after authentication
 * @module features/dashboard/pages/main
 */

import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { ChannelsSidebarComponent } from '../../components/channels-sidebar/channels-sidebar.component';
import { WelcomeChannelComponent } from '../../components/welcome-channel/welcome-channel.component';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardHeaderComponent, ChannelsSidebarComponent, WelcomeChannelComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
