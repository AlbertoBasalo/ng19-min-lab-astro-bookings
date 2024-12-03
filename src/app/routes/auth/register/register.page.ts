import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '@ui/page-header.component';
import { NULL_REGISTER_DTO, RegisterDto } from '../../../shared/models/register.dto';
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
  private readonly registerDto = signal(NULL_REGISTER_DTO);

  /**
   * Resource of the register action
   */
  protected registerResource = rxResource({
    request: () => this.registerDto(),
    loader: (param) => this.authService.register(param.request)
  })
  /**
   * Registers a user
   */
  protected register(registerDto: RegisterDto): void {
    this.registerDto.set(registerDto);
  }
}
