import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '@ui/page-header.component';
import { LoginDto } from '../../../shared/models/login.dto';
import { AuthService } from '../auth.service';
import LoginForm from './login.form';

/**
 * The login page component
 * - route: /auth/login
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LoginForm, PageHeaderComponent],
  template: `
    <article>
      <lab-page-header title="🔐 Login" />
      <lab-login-form (login)="login($event)" />
      <p>{{ result() }}</p>
      <footer>
        <a routerLink="../register">🔏 Register if don´t have an account</a>
      </footer>
    </article>
  `,
})
export default class LoginPage {
  private readonly authService = inject(AuthService);

  protected readonly result = this.authService.result;
  /**
   * Logs in a user
   */
  protected login(loginDto: LoginDto ): void {
    this.authService.login(loginDto);
  }
}
