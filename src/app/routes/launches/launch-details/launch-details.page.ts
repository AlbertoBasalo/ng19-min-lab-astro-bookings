import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, InputSignal, signal, Signal, WritableSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { LaunchDto, NULL_LAUNCH } from '@models/launch.dto';
import { NULL_ROCKET, RocketDto } from '@models/rocket.dto';
import { AuthStore } from '@services/auth.store';
import { PageHeaderComponent } from '@ui/page-header.component';
import { LaunchesRepository } from 'src/app/shared/api/launches.repository';
import { RocketsRepository } from 'src/app/shared/api/rockets.repository';
import BookSeatsForm from './book-seats.form';
/**
 * The launch details page component
 * - route: /launches/:id
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, CurrencyPipe, PageHeaderComponent, BookSeatsForm],
  template: `
    <article>
      <lab-page-header [title]="title()" [subtitle]="subtitle()" />
      <main>
        <p><b>Rocket: </b> {{ rocket().name }} ({{ rocket().capacity }} seats)</p>
        <p><b>Destination: </b> {{ launch().destination }}</p>
        <p><b>Date: </b> {{ launch().date | date : 'medium' }}</p>
        <p><b>Price per seat: </b> {{ launch().pricePerSeat | currency }}</p>
      </main>
      <footer>
        @defer (when isLoggedIn()) {
          <lab-book-seats-form 
            [launch]="launch()" 
            [rocket]="rocket()" 
            [(seats)]="bookSeats" 
            (bookNow)="book()"
          />
      } 
      </footer>
    </article>
  `,
})
export default class LaunchDetailsPage {
  private readonly launchesRepository = inject(LaunchesRepository);
  private readonly rocketsRepository = inject(RocketsRepository);
  private readonly authStore = inject(AuthStore);
  /**
   * The launch id
   * - Comes from the route parameters
   * - Will be provided by the router
   */
  public readonly id: InputSignal<string> = input.required<string>();

  protected readonly launchResource = rxResource({
    request: ()=> this.id(),
    loader: (param) => this.launchesRepository.getById$(param.request)
  })

  /**
   * The launch object computed from the `id` input signal
   * - Warning: this works because the `find` method is **synchronous**
   * - Returns the launch or the NULL_LAUNCH if the launch is not found
   * - This way we avoid undefined errors
   */
  protected readonly launch: Signal<LaunchDto> =  computed(() => this.launchResource.value() || NULL_LAUNCH);

  /**
   * The title signal
   * - Computed from the launch mission
   */
  protected readonly title: Signal<string> = computed( () => '🚀 ' + this.launch().mission );

  /**
   * The subtitle signal
   * - Computed from the launch id
   */
  protected readonly subtitle: Signal<string> = computed( () => 'launch-details for: ' + this.id() );

  /**
   * Resource of the rocket
   */
  protected readonly rocketResource = rxResource({
    request: ()=> this.launch().rocketId,
    loader: (param) => this.rocketsRepository.getById$(param.request)
  })

  /**
   * The rocket object computed from the launch
   * - Returns the rocket or NULL_ROCKET if the rocket is not found
   * - This way we do not need to check if the rocket is undefined before using it
   */
  protected readonly rocket: Signal<RocketDto> = computed(() => this.rocketResource.value() || NULL_ROCKET);
  /**
   * The user is logged in signal
   */
  protected readonly isLoggedIn: Signal<boolean> = this.authStore.selectIsAuthenticated;

  /**
   * The number of seats to book
   * - Set from the book-seats-form component
   * - A model binding is an input/output signal
   */
  protected readonly bookSeats: WritableSignal<number> = signal<number>(0);

  /**
   * The book seats method
   * - will dispatch a booking event to the server
   */
  protected book() {
    console.log(`booking ${this.bookSeats()} seats on launch ${this.launch().id}`);
  }
}
