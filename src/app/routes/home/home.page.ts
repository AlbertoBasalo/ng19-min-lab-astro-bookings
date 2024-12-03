import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LaunchDto } from '@models/launch.dto';
import { PageHeaderComponent } from '@ui/page-header.component';
import { LaunchesRepository } from 'src/app/shared/api/launches.repository';
import { LaunchesListComponent } from './launches-list.component';

/**
 * Home page component
 * - It is routed to the root path `/`
 * - Do not need any selector as it is used by the router
 * - It used OnPush change detection strategy to improve performance
 * @requires LaunchesRepository to get the launches
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, LaunchesListComponent],
  template: `
    <article>
      <lab-page-header [title]="title" subtitle="Choose your journey" />
      <main>
        <lab-launches-list [launches]="launches" />
      </main>
    </article>
  `,
})
export class HomePage {
  private readonly launchesRepository = inject(LaunchesRepository);
  protected readonly title: string = 'Upcoming Launches';
  /**
   * Array of launches
   */
  protected launches: LaunchDto[] = this.launchesRepository.getAll();
}
