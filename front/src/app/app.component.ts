import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Point } from '@angular/cdk/drag-drop';

@Component({
  selector: 'rag-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent {
  private readonly _router = inject(Router);

  public title = 'ragna-clicker';
  public hudStartingPosition: Point = { x: 720, y: 0 };

  /**
   * Check if the router url contains the specified route
   *
   * @param {string} route
   * @returns
   * @memberof AppComponent
   */
  public hasRoute(route: string) {
    return this._router.url.includes(route);
  }
}
