import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HudComponent, PlayerInfoComponent } from '@components';
import { DragDropModule, Point } from '@angular/cdk/drag-drop';
import { PlayerService } from '@shared/services';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'rag-hud-info',
  standalone: true,
  imports: [CommonModule, DragDropModule, HudComponent, PlayerInfoComponent],
  templateUrl: './hud-info.component.html',
  styleUrls: ['./hud-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudInfoComponent implements OnInit {
  // Angular
  @Input({ required: true }) public game!: HTMLElement;

  // Dependency Injections
  private readonly _playerService = inject(PlayerService);

  // Streams
  public player$ = this._playerService.player$;
  private _hudStartingPosition$ = new BehaviorSubject<Point>({ x: 0, y: 0 });
  public hudStartingPosition$ = this._hudStartingPosition$.asObservable();

  // Variables
  public hudStartingPosition!: Point;

  //Functions
  public ngOnInit(): void {
    this.hudStartingPosition = this._hudStartingPosition$.value;
  }
}
