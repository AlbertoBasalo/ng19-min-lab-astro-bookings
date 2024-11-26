import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "./core/layout/footer.component";
import { HeaderComponent } from "./core/layout/header.component";


/**
 * Root component
 * - It displays the header, footer and the router outlet
 * - `title` a signal to set the title
 * @requires HeaderComponent to display the header
 * @requires FooterComponent to display the footer
 * @requires RouterOutlet to display the router outlet
 */
@Component({
  selector: "lab-root",
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
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
