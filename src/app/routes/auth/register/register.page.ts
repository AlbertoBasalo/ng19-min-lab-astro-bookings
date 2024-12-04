import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '@ui/page-header.component';
import { RegisterDto } from '../../../shared/models/register.dto';
import { AuthStore } from '../auth.store';
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
      <p>{{ result() }}</p>
      <footer>
        <a routerLink="../login"> 🔐 Login if already have an account</a>
      </footer>
    </article>
  `,
})
export default class RegisterPage {
  private readonly authStore = inject(AuthStore);
  protected readonly result = this.authStore.selectResult;
  /**
   * Registers a user
   */
  protected register(registerDto: RegisterDto): void {
    this.authStore.dispatchRegister(registerDto);
  }
}
