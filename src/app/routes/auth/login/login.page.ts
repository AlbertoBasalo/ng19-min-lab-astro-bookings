import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '@ui/page-header.component';
import { LoginDto, NULL_LOGIN_DTO } from '../../../shared/models/login.dto';
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
      <footer>
        <a routerLink="../register">🔏 Register if don´t have an account</a>
      </footer>
    </article>
  `,
})
export default class LoginPage {
  private readonly authService = inject(AuthService);
  private readonly loginDto = signal(NULL_LOGIN_DTO);

  /**
   * Resource of the login action
   */
  protected loginResource = rxResource({
    request: () => this.loginDto(),
    loader: (param) => this.authService.login(param.request)
  })
  /**
   * Logs in a user
   */
  protected login(loginDto: LoginDto ): void {
    this.loginDto.set(loginDto);
  }
}
