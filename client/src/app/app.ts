import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppHeader } from './app-header/app-header';

@Component({
  selector: 'app-root',
  imports: [RouterModule, AppHeader],
  template: `
    <main>
      <app-header></app-header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
    `,
  styleUrl: './app.css'
})
export class App {
  protected title = 'client';
}
