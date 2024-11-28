import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, InputSignal, Signal } from '@angular/core';
import { LAUNCHES } from '../../../shared/data/launches.data';
import { ROCKETS } from '../../../shared/data/rockets.data';
import { LaunchDto } from '../../../shared/models/launch.dto';
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
    @if (launch()) {
      <p>Launch details for <b>{{ launch()?.mission }}</b></p>
      <p>Rocket: {{ rocket()?.name }}</p>
      <p>Destination: {{ launch()?.destination }}</p>
      <p>Date: {{ launch()?.date | date }}</p>
      <p>Price per seat: {{ launch()?.pricePerSeat | currency }}</p>
      <p>Status: {{ launch()?.status }}</p>
      <p>Capacity: {{ rocket()?.capacity }}</p>
    } @else {
      <p>Launch not found</p>
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
   */
  protected launch: Signal<LaunchDto | undefined> = 
    computed(() => LAUNCHES.find((launch) => launch.id === this.id()));


  protected rocket: Signal<RocketDto | undefined> = 
    computed(() => ROCKETS.find((rocket) => rocket.id === this.launch()?.rocketId));
}
