import { SocialUser } from '@abacritt/angularx-social-login';
import { Point } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HudComponent } from '@components';
import { LoginFormComponent } from './components/login-form';

@Component({
  standalone: true,
  selector: 'rag-home',
  imports: [CommonModule, HudComponent, RouterModule, LoginFormComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
  private readonly _router = inject(Router);

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
