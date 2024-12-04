import { ChangeDetectionStrategy, Component, computed, inject, ResourceRef, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
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
        @switch(launchesResource.status()) {
          @case(1) {
            <p>{{ errorMessage() }}</p>
          }
          @case(2) {
            <p>Loading...</p>
          }
          @default {
            <lab-launches-list [launches]="launches()" />
          }
        }
      </main>
    </article>
  `,
})
export class HomePage {
  private readonly launchesRepository = inject(LaunchesRepository);
  protected readonly title: string = 'Upcoming Launches';

  /**
   * Resource of launches
   * - Has signals with value, error, and working status
   */
  protected readonly launchesResource: ResourceRef<LaunchDto[]> = rxResource(
    { loader: this.launchesRepository.getAll$ }
  );

  /**
   * Array of launches
   * - Signal computed from the launches resource
  */
  protected readonly launches: Signal<LaunchDto[]> = computed(() => this.launchesResource.value() ?? []);

  /**
   * Error message
   * - Signal computed from the launches resource error
   */
  protected readonly errorMessage: Signal<string> = computed(
    () => ( this.launchesResource.error() as { message: string } )['message'] || 'Unknown error'
  );
}
