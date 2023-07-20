import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '@shared/services';
import { HudComponent } from '../hud';
import { BehaviorSubject } from 'rxjs';
import { Point } from '@angular/cdk/drag-drop';

@Component({
  selector: 'rag-reset',
  standalone: true,
  imports: [CommonModule, HudComponent],
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetComponent {
  // Angular
  @Input({ required: true }) public game!: HTMLElement;

  private readonly _playerService = inject(PlayerService);

  private _hudStartingPosition$ = new BehaviorSubject<Point>({ x: 750, y: 750 });
  public hudStartingPosition$ = this._hudStartingPosition$.asObservable();

  public reset() {
    this._playerService.reset();
  }

  public levelUpBase() {
    this._playerService.levelUpBase();
  }
  public levelUpJob() {
    this._playerService.levelUpJob();
  }
}
