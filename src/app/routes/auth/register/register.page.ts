import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegisterDto } from '../../../shared/models/register.dto';
import { RegisterForm } from './register.form';

/**
 * The register page component
 * - route: /auth/register
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RegisterForm],
  template: `
    <h2>🔏 Register</h2>
    <lab-register-form (register)="register($event)" />
    <a routerLink="../login"> 🔐 Login if already have an account</a>
  `,
})
export default class RegisterPage {
  /**
   * Registers a user
   */
  protected register(registerDto: RegisterDto): void {
    console.log('Register: ', registerDto);
  }
}
