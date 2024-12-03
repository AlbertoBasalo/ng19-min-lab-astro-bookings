import { Component, inject, output, OutputEmitterRef } from "@angular/core";
import { FormsModule, NgModel } from "@angular/forms";
import { LoginDto } from "@models/login.dto";
import { FormsService } from "@services/forms.service";


/**
 * Login form component
 * - It is a form component to login a user
 * @requires FormsService to check if the model must be marked as invalid
 */
@Component({
  selector: 'lab-login-form',
  imports: [FormsModule],
  template: `
    <form #f="ngForm">
      <fieldset>
        <section>
          <label for="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            [(ngModel)]="email"
            #emailModel="ngModel"
            required
            email
            [attr.aria-invalid]="emailModel.invalid"
          />
          @if(this.modelInvalid(emailModel)){
          <small>Invalid email</small>
          }
        </section>
        <section>
          <label for="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            [(ngModel)]="password"
            #passwordModel="ngModel"
            required
            minlength="4"
            [attr.aria-invalid]="passwordModel.invalid"
          />
          @if(this.modelInvalid(passwordModel)){
          <small>Password must be at least 4 characters long</small>
          }
        </section>
      </fieldset>
      <button type="submit" [disabled]="f.invalid" (click)="submit()">
        Login
      </button>
    </form>`,
})
export default class LoginForm {
  private readonly formsService = inject(FormsService);
  /**
   * Emits an event when the form is submitted
   * - It is an output emitter
   * @example
   * <lab-login-form (login)="login($event)" />
   */
  public readonly login: OutputEmitterRef<LoginDto> = output<LoginDto>();

  /**
  * The email basic property
 */
  protected email: string = 'a@b.c';
  /**
   * The password basic property
   */
  protected password: string = '';
  /**
     * Checks if the model must be marked as invalid
     * - It is a helper function to avoid pristine invalid marks
     */
  protected readonly modelInvalid = (model: NgModel): boolean | undefined => this.formsService.modelInvalid(model);

  /**
   * Submits the form value
   */
  protected submit(): void {
    const loginDto: LoginDto = {
      email: this.email,
      password: this.password,
    };
    this.login.emit(loginDto);
  }
}
