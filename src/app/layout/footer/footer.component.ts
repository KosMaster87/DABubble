/**
 * @fileoverview Footer Component
 * @description Footer with popup-signup and legal-information components
 * @module FooterComponent
 */

import { Component, computed, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { PopupSignupComponent } from '@features/auth/components/popup-signup/popup-signup.component';
import { LegalInformationComponent } from '@shared/components/legal-information/legal-information.component';

@Component({
  selector: 'app-footer',
  imports: [PopupSignupComponent, LegalInformationComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
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
