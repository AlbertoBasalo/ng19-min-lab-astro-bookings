import { UpperCasePipe } from "@angular/common";
import { Component, inject, input, InputSignal, Signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthStore } from "@services/auth.store";

/**
 * Header component
 * - It displays the header of the application
 * - `title` a required input signal to set the title
 * @generated with `ng g c core/layout/header`
 * @requires title must be a `string`
 * @requires UpperCasePipe to display the title in uppercase
 */
@Component({
  selector: "lab-header",
  imports: [UpperCasePipe, RouterLink],
  template: `
    <header>
      <nav>
        <ul>
          <li>
            <a routerLink="/">
              <b>{{ title() | uppercase }}</b>
            </a>
          </li>
        </ul>
        <ul>
          <li><a routerLink="/">🏠 Home</a></li>
          <li><a routerLink="/about">ℹ️ About</a></li>
          @if(isAuthenticated()) {
            <li><a routerLink="/">🎟️ My Bookings</a></li>
            <li (click)="logout()">👤 Log out</li>
          } @else {
            <li><a routerLink="/auth/login">🔒 Login</a></li>
          }
        </ul>
      </nav>
    </header>
  `,
})
export class HeaderWidget {
  private readonly authStore = inject(AuthStore);
  /**
   * Application title
   * @requires title must be a `string`
   * @throws an error if the value is not provided
   */
  public readonly title: InputSignal<string> = input.required<string>();

  /**
   * Selects if the user is authenticated
   */
  protected isAuthenticated: Signal<boolean> =
    this.authStore.selectIsAuthenticated;

  /**
   * Logs out the user
   */
  protected logout() {
    this.authStore.dispatchLogout();
  }
}
