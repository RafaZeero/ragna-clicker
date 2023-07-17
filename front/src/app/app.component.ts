import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rag-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent {
  private readonly _router = inject(Router);

  public title = 'ragna-clicker';

  /**
   * Check if the router url contains the specified route
   *
   * @param {string} route
   * @returns
   * @memberof AppComponent
   */
  hasRoute(route: string) {
    return this._router.url.includes(route);
  }
}
