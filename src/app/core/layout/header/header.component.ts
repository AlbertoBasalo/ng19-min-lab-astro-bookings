import { UpperCasePipe } from "@angular/common";
import { Component, input, InputSignal } from "@angular/core";

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
  imports: [UpperCasePipe],
  template: `
    <header>{{ title() | uppercase }}</header>
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
