import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
import { LaunchDto } from '@models/launch.dto';
import { RocketDto } from '@models/rocket.dto';
import { PageHeaderComponent } from '@ui/page-header.component';
import { LaunchesRepository } from 'src/app/shared/api/launches.repository';
import { RocketsRepository } from 'src/app/shared/api/rockets.repository';
/**
 * The launch details page component
 * - route: /launches/:id
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, CurrencyPipe, PageHeaderComponent],
  template: `
    <article>
      <lab-page-header [title]="title()" [subtitle]="subtitle()" />
      <main>
        <p>
          <strong>Rocket:</strong> {{ rocket().name }} ({{ rocket().capacity }}
          seats)
        </p>
        <p><strong>Destination:</strong> {{ launch().destination }}</p>
        @if(!isNullDate()){
        <p><strong>Date:</strong> {{ launch().date | date : 'medium' }}</p>
        }
        <p>
          <strong>Price per seat:</strong>
          {{ launch().pricePerSeat | currency }}
        </p>
      </main>
    </article>
  `,
})
export default class LaunchDetailsPage {
  private readonly launchesRepository = inject(LaunchesRepository);
  private readonly rocketsRepository = inject(RocketsRepository);
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
    computed(() => this.launchesRepository.getById(this.id()) );

  /**
   * The title signal
   * - Computed from the launch mission
   */
  protected readonly title: Signal<string> = computed(
    () => '🚀 ' + this.launch().mission
  );

  /**
   * The subtitle signal
   * - Computed from the launch id
   */
  protected readonly subtitle: Signal<string> = computed(
    () => 'launch-details for: ' + this.id()
  );

  /**
   * Checks if the launch date is null
   * - Computed from the launch date
   */
  protected readonly isNullDate: Signal<boolean> = computed(
    () =>
      this.launch().date.toDateString() ===
      new Date(1, 1, 1, 0, 0, 0, 0).toDateString()
  );

  /**
   * The rocket object computed from the launch
   * - Returns the rocket or NULL_ROCKET if the rocket is not found
   * - This way we do not need to check if the rocket is undefined before using it
   */
  protected rocket: Signal<RocketDto> = 
    computed(() => this.rocketsRepository.getById(this.launch().rocketId));
}
