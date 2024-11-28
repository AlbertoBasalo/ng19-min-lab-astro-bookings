import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LAUNCHES } from '../../shared/data/launches.data';
import { LaunchDto } from '../../shared/models/launch.dto';

/**
 * Home page component
 * - It is routed to the root path `/`
 * - Do not need any selector as it is used by the router
 * - It used OnPush change detection strategy to improve performance
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, RouterLink],
  template: `
    <h3>Next Space Travel launches</h3>
    <ul>
      @for (launch of launches; track launch.id) {
        <li> 
          <!-- A dynamic link -->
          <a [routerLink]="['/launches', launch.id]">
            {{ launch.mission }} - {{ launch.date | date }}
          </a> 
        </li>
      }
    </ul>
  `,
})
export class HomePage {
  /**
   * Array of launches
   */
  protected launches: LaunchDto[] = LAUNCHES;
}
