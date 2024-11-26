import { UpperCasePipe } from "@angular/common";
import { Component, input, InputSignal } from "@angular/core";
import { RouterLink } from "@angular/router";

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
          <li><a routerLink="/about">About</a></li>
          <li><a routerLink="/auth/login">Login</a></li>
        </ul>
      </nav>
    </header>
  `,
})
export class HeaderComponent {
  /**
   * Application title
   * @requires title must be a `string`
   * @throws an error if the value is not provided
   */
  public readonly title: InputSignal<string> = input.required<string>();
}
