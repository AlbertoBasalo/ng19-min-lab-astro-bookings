import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterWidget } from "./core/layout/footer.widget";
import { HeaderWidget } from "./core/layout/header.widget";


/**
 * Root component
 * - It displays the header, footer and the router outlet
 * - `title` a signal to set the title
 * @requires HeaderWidget to display the header
 * @requires FooterWidget to display the footer
 * @requires RouterOutlet to display the router outlet
 */
@Component({
  selector: "lab-root",
  imports: [RouterOutlet, HeaderWidget, FooterWidget],
  template: `
    <!-- Header component with title custom attribute -->
    <lab-header [title]="title" />
    <router-outlet />
    <lab-footer [appName]="title" />
  `,
  styles: [],
})
export class AppComponent {
  /**
   * Simple primitive property used in the template
   */
  protected readonly title: string = "🚀 Astro Bookings";
}
