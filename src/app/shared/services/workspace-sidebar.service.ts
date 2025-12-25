/**
 * @fileoverview Workspace Sidebar Service
 * @description Service to manage workspace sidebar state globally
 * @module shared/services/workspace-sidebar
 */

import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceSidebarService {
  private _isHidden = signal(false);
  readonly isHidden = this._isHidden.asReadonly();
  readonly isVisible = computed(() => !this._isHidden());

  /**
   * Toggle sidebar visibility
   */
  toggle(): void {
    this._isHidden.update((value) => !value);
  }

  /**
   * Show sidebar
   */
  show(): void {
    this._isHidden.set(false);
  }

  /**
   * Hide sidebar
   */
  hide(): void {
    this._isHidden.set(true);
  }
}
