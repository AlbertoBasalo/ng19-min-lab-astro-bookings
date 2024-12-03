import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '@ui/page-header.component';
import { RegisterDto } from '../../../shared/models/register.dto';
import { AuthService } from '../auth.service';
import { RegisterForm } from './register.form';

/**
 * The register page component
 * - route: /auth/register
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RegisterForm, PageHeaderComponent ],
  template: `
    <article>
      <lab-page-header title="🔏 Register" />
      <lab-register-form (register)="register($event)" />
      <footer>
        <a routerLink="../login"> 🔐 Login if already have an account</a>
      </footer>
    </article>
  `,
})
export default class RegisterPage {
  private readonly authService = inject(AuthService);
  /**
   * Registers a user
   */
  protected register(registerDto: RegisterDto): void {
    this.authService.register(registerDto).subscribe();
  }
}
