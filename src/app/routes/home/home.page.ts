import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LaunchDto } from '@models/launch.dto';
import { LaunchesRepository } from 'src/app/shared/api/launches.repository';

/**
 * Home page component
 * - It is routed to the root path `/`
 * - Do not need any selector as it is used by the router
 * - It used OnPush change detection strategy to improve performance
 * @requires LaunchesRepository to get the launches
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, RouterLink],
  template: `
    <h2>Next Space Travel Launches</h2>
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
  private readonly launchesRepository = inject(LaunchesRepository);
  /**
   * Array of launches
   */
  protected launches: LaunchDto[] = this.launchesRepository.getAll();
}
