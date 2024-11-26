import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
 protected launches = [
   {
     id: 'lnc-1',
     agencyId: 'agc-1',
     rocketId: 'rck-1',
     date: new Date(2029, 5, 1),
     mission: 'Moon Landing',
     destination: 'Moon',
     pricePerSeat: 100,
     status: 'scheduled',
   },
    {
      id: 'lnc-2',
      agencyId: 'agc-1',
      rocketId: 'rck-2',
      date: new Date(2039, 6, 20),
      mission: 'Mars Landing',
      destination: 'Mars',
      pricePerSeat: 200,
      status: 'scheduled',
    },
  ];
}
