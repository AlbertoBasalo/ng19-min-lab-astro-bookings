import { ChangeDetectionStrategy, Component, computed, Signal, signal, viewChild, WritableSignal } from "@angular/core";
import { FormsModule, NgModel } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink ],
  template: `
    <h2>🔏 Register</h2>
    <form #form="ngForm">
      <section>
        <label for="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          [(ngModel)]="name"
          #nameInput="ngModel"
          required
          minlength="3"
          [attr.aria-invalid]="nameInput.invalid && nameInput.touched" />
        @if (nameInput.invalid && nameInput.touched) {
        <small>Name must be at least 3 characters long</small>
        }
      </section>
      <section>
        <label for="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          [(ngModel)]="email"
          #emailInput="ngModel"
          required
          email
          [attr.aria-invalid]="emailInput.invalid && emailInput.touched" />
        @if (emailInput.invalid && emailInput.touched) {
        <small>Email is invalid</small>
        }
      </section>
      <section>
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          [(ngModel)]="password"
          #passwordInput="ngModel"
          required
          minlength="4"
          [attr.aria-invalid]="passwordInvalid()" />
        @if (passwordInvalid()) {
        <small>Password must be at least 4 characters long</small>
        }
      </section>
      <section>
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          [(ngModel)]="confirmPassword"
          #confirmPasswordInput="ngModel"
          required
          minlength="4"
          [attr.aria-invalid]="confirmPasswordInvalid()" />
        @if (confirmPasswordInvalid()) {
        <small>Passwords do not match</small>
        }
      </section>
      <button type="submit" [disabled]="form.invalid" (click)="register()">Register</button>
    </form>
    <a routerLink="../login">🔐 Login if you already have an account</a>
  `,
  styles: ``,
})
export default class RegisterPage {
  protected readonly name: WritableSignal<string> = signal("");
  protected readonly email: WritableSignal<string> = signal("");
  protected readonly password: WritableSignal<string> = signal("");
  protected readonly confirmPassword: WritableSignal<string> = signal("");

  protected readonly passwordInputRef = viewChild.required<NgModel>("passwordInput");
  protected readonly confirmPasswordInputRef = viewChild.required<NgModel>("confirmPasswordInput");

  protected readonly passwordInvalid: Signal<boolean | undefined> = computed(() => {
    const password = this.password(); // trigger computation
    const passwordRef = this.passwordInputRef();
    if ( passwordRef.pristine ) return undefined;
    return !!passwordRef.invalid; // ensure boolean
  });

  protected readonly confirmPasswordInvalid: Signal<boolean | undefined> = computed(() => {
    const password = this.password();
    const confirmPassword = this.confirmPassword();
    const confirmPasswordRef = this.confirmPasswordInputRef();
    if (confirmPasswordRef.pristine) return undefined;
    if (password !== confirmPassword) {
      confirmPasswordRef.control.setErrors({ mismatch: true });
    } else {
      confirmPasswordRef.control.setErrors(null);
    }
    return !!confirmPasswordRef.errors;
  });

  protected register() {
    const registerData = {
      name: this.name(),
      email: this.email(),
      password: this.password(),
    };
    console.log(registerData);
  }
}
