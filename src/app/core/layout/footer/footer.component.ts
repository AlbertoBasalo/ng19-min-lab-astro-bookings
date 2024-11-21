import { Component, input, InputSignal, signal, WritableSignal } from "@angular/core";
import { Author } from "./author.type";

/**
 * Footer component
 * - It displays the footer of the application
 * - `appName` an input signal to set the app name
 * @generated with `ng g c core/layout/footer`
 */
@Component({
  selector: "lab-footer",
  template: `
    <footer>
      <section>
        <!-- Signals must be invoked like functions -->
        <span>{{ appName() }}</span>
        <span>
          <!-- Attributes can be evaluated with expressions using [square brackets] -->
          <a [href]="author.url" target="_blank">{{ author.name }}</a>
        </span>
        <span>©️ {{ year }}</span>
        <span>{{ version }}</span>
      </section>
      <section>
        <!-- The @if directive creates a conditional structure -->
        <!-- The @else directive creates the alternative structure -->
        @if(cookiesAccepted()){
        <span>🍪 Cookies accepted</span>
        } @else{
        <!-- Event binding can be used with (parenthesis) -->
        <button class="secondary outline" (click)="acceptCookies()">Accept cookies</button>
        }
      </section>
    </footer>
  `,
})
export class FooterComponent {
  /**
   * App name
   * - It must be a `string`
   * - Must be `public` to be seen outside the component
   * - Should be initialized with a default value,
   * - Or accept `undefined` as a valid value (not recommended)
   * - Should be `readonly` as the reference should not be changed
   */
  public readonly appName: InputSignal<string> = input<string>("Initial value");

  // Protected properties can be seen from the template, but not from outside the component

  protected version: string = "Angular 19";
  /**
   * Can be initialized with an expression
   */
  protected year: number = new Date().getFullYear();

  /**
   * Can be initialized with an object
   * - Always defined with a model (interface or type)
   * - In this case `Author`
   */
  protected author: Author = {
    name: "Alberto Basalo",
    url: "https://albertobasalo.dev",
  };

  // Writable signal properties can be changed

  /**
   * Writable signal to store if the cookies are accepted
   * - It is typed as `boolean`
   * - Should be initialized with `false`
   * - Must be changed with `.set()` or `.update()` methods
   */
  protected cookiesAccepted: WritableSignal<boolean> = signal<boolean>(false);

  // Protected methods can be called from the template

  /**
   * Method to accept cookies
   * - It changes the `cookiesAccepted` signal to `true`
   * - The name is related to the action, in this case "accept cookies"
   * - Not attached to the event (avoid `(click)="onClick()"`)
   */
  protected acceptCookies() {
    this.cookiesAccepted.set(true);
  }
}
