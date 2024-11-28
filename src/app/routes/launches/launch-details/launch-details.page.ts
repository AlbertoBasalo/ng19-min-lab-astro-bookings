import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, InputSignal, Signal } from '@angular/core';
import { LAUNCHES } from '../../../shared/data/launches.data';
import { ROCKETS } from '../../../shared/data/rockets.data';
import { LaunchDto, NULL_LAUNCH } from '../../../shared/models/launch.dto';
import { RocketDto } from '../../../shared/models/rocket.dto';
// ToDo: use aliases paths


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, CurrencyPipe],
  template: `
    <h2>
      <!-- The launch id is used like any other signal -->
      {{ id() }}
    </h2>
    <p>Launch details for <b>{{ launch().mission }}</b></p>
    <p>Destination: {{ launch().destination }}</p>
    <p>Date: {{ launch().date | date }}</p>
    <p>Price per seat: {{ launch().pricePerSeat | currency }}</p>
    <p>Status: {{ launch().status }}</p>
    @if (rocket()) {
      <p>Rocket: {{ rocket()?.name }}</p>
      <p>Capacity: {{ rocket()?.capacity }}</p>
    } @else {
      <p>Rocket not found</p>
    }
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

  /**
   * The launch object computed from the `id` input signal
   * - Warning: this works because the `find` method is **synchronous**
   * - Returns the launch or the NULL_LAUNCH if the launch is not found
   * - This way we avoid undefined errors
   */
  protected launch: Signal<LaunchDto> = 
    computed(() => LAUNCHES.find((launch) => launch.id === this.id()) || NULL_LAUNCH);

  /**
   * The rocket object computed from the launch
   * - Returns the rocket or undefined if the rocket is not found
   * - This way we need to check if the rocket is undefined before using it
   */
  protected rocket: Signal<RocketDto | undefined> = 
    computed(() => ROCKETS.find((rocket) => rocket.id === this.launch()?.rocketId));
}
