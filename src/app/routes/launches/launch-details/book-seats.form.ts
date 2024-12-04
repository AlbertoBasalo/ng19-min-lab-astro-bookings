import { Component, computed, input, InputSignal, model, ModelSignal, output, OutputEmitterRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LaunchDto } from "@models/launch.dto";
import { RocketDto } from "@models/rocket.dto";
/**
 * The book seats form component
 * @requires launch - the launch
 * @requires rocket - the rocket
 * @requires seats - number of seats to book
 */
@Component({
  selector: 'lab-book-seats-form',
  imports: [FormsModule],
  template: `
    <form>
      <fieldset>
        <legend>Book Seats to <b>{{ launch().destination }}</b></legend>
        <label for="seats">Book Seats</label>
        <input type="number" id="seats" name="seats" [(ngModel)]="seats" max="{{ rocket().capacity }}" min="0" />
      </fieldset>
      @if (seats() > 0) {
        <button type="submit" (click)="bookNow.emit()">Book tickets for {{ total()  }}</button>
      }
    </form>
  `,
})
export default class BookSeatsForm {
  /**
   * The launch
   * - Required input
   */
  public readonly launch: InputSignal<LaunchDto> = input.required<LaunchDto>();
  /**
   * The rocket
   * - Computed from the launch
   */
  public readonly rocket: InputSignal<RocketDto> = input.required<RocketDto>();
  /**
   * The number of seats to book
   * - Model binding
   * - Read/Write
   * - Input/Output
   */
  public readonly seats: ModelSignal<number> = model.required<number>();
  /**
   * The output to book the seats
   * - Output emitter without a value
   */
  public readonly bookNow: OutputEmitterRef<void> = output<void>();


  /**
   * The price per seat
   * - Computed from the launch
   */
  private readonly pricePerSeatMillions = computed(() => this.launch().pricePerSeat /1000000);

  /**
   * The total amount
   * - Computed from the seats and the price per seat
   */
  private readonly totalAmount = computed(() => this.seats()* this.pricePerSeatMillions());

  /**
   * The total price for the seats
   * - Computed from the total amount
   */
  protected readonly total = computed(() => `${this.totalAmount()} millions`);
}