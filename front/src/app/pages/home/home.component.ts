import { SocialUser, SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { Point } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HudComponent } from '@components';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { UserService } from '@shared/services';

@Component({
  standalone: true,
  selector: 'rag-home',
  imports: [CommonModule, HudComponent, RouterModule, GoogleSigninButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
  private readonly _router = inject(Router);
  private readonly _oauthService = inject(SocialAuthService);
  private readonly _userService = inject(UserService);

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

  public user!: SocialUser;
  public loggedIn!: boolean;

  public ngOnInit() {
    this._oauthService.authState.subscribe(user => {
      this.user = user;
      this.loggedIn = user != null;
      console.log(user);

      if (this.loggedIn) {
        this._userService.user = user.name;
        localStorage.setItem('userLogged', user.name);
        this._router.navigateByUrl('/play');
      }
    });
  }
}
