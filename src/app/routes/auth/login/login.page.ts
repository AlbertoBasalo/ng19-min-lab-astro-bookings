import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink],
  template: `
    <h2>🔐 Login</h2>
    <form #form="ngForm">
      <section>
        <label for="email">Email</label>
        <input type="text" name="email" id="email" [(ngModel)]="email" required email />
      </section>
      <section>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" [(ngModel)]="password" required minlength="4" />
        @if (password().length > 0 && password().length < 4) {
          <small>Password must be at least 4 characters long</small>
        }
      </section>
      <button type="submit" [disabled]="form.invalid" (click)="login()">Login</button>
    </form>
    <!-- A relative link -->
    <a routerLink="../register">🔏 Register if you don't have an account</a>
  `,
  styles: ``
})
export default class LoginPage {
  readonly email: WritableSignal<string> = signal('');
  readonly password: WritableSignal<string> = signal('');

  login() {
    console.log(this.email(), this.password());
  }
}
