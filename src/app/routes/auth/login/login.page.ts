import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginDto } from '../../../shared/models/login.dto';
import LoginForm from './login.form';

/**
 * The login page component
 * - route: /auth/login
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LoginForm ],
  template: `
    <h2>🔐 Login</h2>
    <lab-login-form (login)="login($event)" />
    <a routerLink="../register">🔏 Register if don´t have an account</a>
  `,
})
export default class LoginPage {
  /**
   * Logs in a user
   */
  protected login(loginDto: LoginDto ): void {
    console.log('Login: ', loginDto);
  }
}
