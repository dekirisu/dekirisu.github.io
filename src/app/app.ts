import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink, RouterOutlet],
  template: `
    <nav>
    </nav>

    <router-outlet />
  `,
  styles: `
    :host {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
      display: block;
    }

    nav {
      text-align: left;
      padding: 0 0 2rem 0;
    }
  `,
})
export class AppComponent {}
