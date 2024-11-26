import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <p>
      login works!
    </p>
    <!-- A relative link -->
    <a routerLink="../register">🔏 Register if you don't have an account</a>
  `,
  styles: ``
})
export default class LoginPage {

}
