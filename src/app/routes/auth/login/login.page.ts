import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lab-login',
  imports: [RouterLink],
  template: `
    <p>
      login works!
    </p>
    <a routerLink="../register">Register if you don't have an account</a>
  `,
  styles: ``
})
export default class LoginPage {

}
