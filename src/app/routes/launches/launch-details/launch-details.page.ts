import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>
      <!-- The launch id is used like any other signal -->
      launch-details for <b>{{ id() }}</b>
    </p>
  `,
  styles: ``
})
export default class LaunchDetailsPage {
  /**
   * The launch id
   * - Comes from the route parameters
   * - Will be provided by the router
   */
  public readonly id: InputSignal<string> = input.required<string>();
}
