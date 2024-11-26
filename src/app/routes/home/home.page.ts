import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, RouterLink],
  template: `
    <p>
      Next Space Travel launches
    </p>
    <ul>
    @for (launch of launches; track launch.id) {
        <li> 
          <a [routerLink]="['/launches', launch.id]">
            {{ launch.mission }} - {{ launch.date | date }}
          </a> 
        </li>
      }
    </ul>
  `,
  styles: ``
})
export class HomePage {
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
