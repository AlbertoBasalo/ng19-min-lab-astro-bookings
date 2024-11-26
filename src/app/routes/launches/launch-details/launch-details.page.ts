import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>
      launch-details for <b>{{ id() }}</b>
    </p>
  `,
  styles: ``
})
export default class LaunchDetailsPage {
  public readonly id: InputSignal<string> = input.required<string>();
}
