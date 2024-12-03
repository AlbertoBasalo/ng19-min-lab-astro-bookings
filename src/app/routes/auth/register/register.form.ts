import { Component, computed, effect, inject, output, OutputEmitterRef, signal, viewChild, WritableSignal } from "@angular/core";
import { FormsModule, NgModel } from "@angular/forms";
import { RegisterDto } from "@models/register.dto";
import { FormsService } from "@services/forms.service";

/**
 * The register form component
 * - It is a form component to register a user
 * @requires FormsService to check if the model must be marked as invalid
 */
@Component({
  selector: 'lab-register-form',
  imports: [FormsModule],
  template: `
    <form #f="ngForm">
      <fieldset>
        <section>
          <label for="username">User name</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="User name"
            [(ngModel)]="username"
            #usernameModel="ngModel"
            required
            minlength="3"
            [attr.aria-invalid]="modelInvalid(usernameModel)"
          />
          @if(modelInvalid(usernameModel)){
          <small>User name must be at least 3 characters long</small>
          }
        </section>
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
            [attr.aria-invalid]="modelInvalid(emailModel)"
          />
          @if(modelInvalid(emailModel)){
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
            [attr.aria-invalid]="modelInvalid(passwordModel)"
          />
          @if(modelInvalid(passwordModel)){
          <small>Password must be at least 4 characters long</small>
          }
        </section>
        <section>
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            [(ngModel)]="confirmPassword"
            #confirmPasswordModel="ngModel"
            [attr.aria-invalid]="modelInvalid(confirmPasswordModel)"
          />
        </section>
      </fieldset>
      <button type="submit" [disabled]="f.invalid" (click)="submit()">
        Register
      </button>
    </form>
  `,
})
export  class RegisterForm {
  private readonly formsService = inject(FormsService);
  /**
   * Emits an event when the form is submitted
   * - It is an output emitter
   * @example
   * <lab-register-form (register)="register($event)" />
   */
  public readonly register: OutputEmitterRef<RegisterDto> = output<RegisterDto>();

  protected readonly username: WritableSignal<string> = signal('');
  protected readonly email: WritableSignal<string> =   signal('');
  protected readonly password: WritableSignal<string> = signal('');
  protected readonly confirmPassword: WritableSignal<string> = signal('');

  /**
   * Checks if the model must be marked as invalid
   * - It is a helper function to avoid pristine invalid marks
   */
  protected readonly modelInvalid = (model: NgModel): boolean | undefined => this.formsService.modelInvalid(model);

  /**
   * The confirm password model template reference
   * - A view child signal to selects an element by its _Angular#Id_
   */
  protected readonly confirmPasswordModel = viewChild<NgModel>('confirmPasswordModel');

  /**
   * The passwords matches computed signal
   * - It is a computed signal to check if the passwords are the same
   */
  private readonly passwordsMatches = computed(
    () => this.password() === this.confirmPassword()
  );

  /**
   * The password validation effect
   * - It is an effect to validate the passwords are the same
   * - Triggers when:
   * - the confirm password model changes
   * - the passwords matches computed signal changes
   */
  private passwordValidationEffect = effect(() => {
    const model = this.confirmPasswordModel();
    if (!model) return;
    const control = model.control;
    if (this.passwordsMatches()) {
      control.setErrors(null);
    } else {
      control.setErrors({ passwordMismatch: true });
    }
  });

  protected submit(): void {
    const registerDto: RegisterDto = {
      username: this.username(),
      email: this.email(),
      password: this.password(),
    };
    this.register.emit(registerDto);
  }
}
