import { Point } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HudComponent } from '@components';
import { LoginFormComponent } from './components/login-form';
import { BehaviorSubject } from 'rxjs';
import { SignupFormComponent } from './components/signup-form';

@Component({
  standalone: true,
  selector: 'rag-home',
  imports: [CommonModule, HudComponent, RouterModule, LoginFormComponent, SignupFormComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent implements AfterViewInit {
  private readonly _router = inject(Router);

  @ViewChild(HudComponent) public readonly hud!: HudComponent;

  private readonly _hudStartingPosition$ = new BehaviorSubject<Point>({ x: 0, y: 0 });
  public readonly hudStartingPosition$ = this._hudStartingPosition$.asObservable();

  public readonly _formType$ = new BehaviorSubject<'login' | 'signup'>('login');
  public readonly formType$ = this._formType$.asObservable();

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

  public ngAfterViewInit(): void {
    // * Put the hud on center when page loads
    this._hudStartingPosition$.next({
      x: window.innerWidth / 2 - this.hud.hudRef.nativeElement.offsetWidth / 2,
      y: window.innerHeight / 2 - this.hud.hudRef.nativeElement.offsetHeight / 2,
    });
  }

  public changeFormType(type: 'login' | 'signup') {
    this._formType$.next(type);
  }
}
