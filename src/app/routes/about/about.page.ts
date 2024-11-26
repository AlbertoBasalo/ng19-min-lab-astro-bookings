import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <article>
      <header>
      <h2>
        About Astro Bookings sample app
        </h2>
      </header>
      <main>
        <h3>
          Tech stack 
        </h3>
        <ul>
          @for (tech of techStack; track tech.name) {
            <li>
              <a [href]="tech.url">{{ tech.name }}</a>
            </li>
          }
        </ul>
        <h3>
          Features 
        </h3>
        <ul>
            @for (feature of features; track feature) {
              <li>{{ feature }}</li>
            }
            </ul>
          </main>
      <footer>
        <h3>Repository</h3>
        <a href="https://github.com/albertobasalo/ng19-min-lab-astro-bookings" target="_blank">
          https://github.com/albertobasalo/ng19-min-lab-astro-bookings
        </a>
      </footer>
    </article>
  `,
  styles: ``
})
export default class AboutPage {

  protected readonly features = [
    'Astro Bookings is a space travel booking app',
    'It is built with Angular and Astro',
    'It uses Pico.css for styling',
    'It uses RxJS for reactive programming',
  ]

  protected readonly techStack = [
    {
      name: 'Angular',
      url: 'https://angular.dev/',
    },
    {
      name: 'Pico.css',
      url: 'https://picocss.com/',
    },
    {
      name: 'RxJS',
      url: 'https://rxjs.dev/',
    }
  ]
}
