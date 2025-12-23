/**
 * @fileoverview Header Component
 * @description Header with DABubble logo and popup-signup components
 * @module HeaderComponent
 */

import { Component, computed, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { DABubbleLogoComponent } from '@shared/components/dabubble-logo/dabubble-logo.component';
import { PopupSignupComponent } from '@features/auth/components/popup-signup/popup-signup.component';

@Component({
  selector: 'app-header',
  imports: [DABubbleLogoComponent, PopupSignupComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);

  /**
   * Signal tracking the current URL from router navigation events
   * @private
   */
  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url)
    )
  );

  /**
   * Computed signal that determines if popup-signup should be shown
   * Only displays the signup link on the signin page (home)
   * @protected
   * @returns {boolean} True if on signin page
   */
  protected showPopupSignup = computed(() => {
    const url = this.currentUrl();
    return url === '/' || url === '';
  });
}
