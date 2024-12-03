import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LaunchDto } from '@models/launch.dto';


@Component({
  selector: 'lab-launches-list',
  imports: [DatePipe, RouterLink],
  template: `
    <ul>
      @for (launch of launches(); track launch.id) {
      <li>
        <!-- A dynamic link -->
        <a [routerLink]="['launches', launch.id]">
          {{ launch.mission }} - {{ launch.date | date }}
        </a>
      </li>
      }
    </ul>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchesListComponent {
  public readonly launches: InputSignal<LaunchDto[]> =
    input.required<LaunchDto[]>();
}
