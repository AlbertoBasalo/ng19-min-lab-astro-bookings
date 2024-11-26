import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>
      register works!
    </p>
  `,
  styles: ``
})
export default class RegisterPage {

}
