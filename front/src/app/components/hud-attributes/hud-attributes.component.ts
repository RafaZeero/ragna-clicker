import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HudComponent, PlayerAttributesComponent } from '@components';
import { DragDropModule, Point } from '@angular/cdk/drag-drop';
import { PlayerService } from '@shared/services';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'rag-hud-attributes',
  standalone: true,
  imports: [CommonModule, DragDropModule, HudComponent, PlayerAttributesComponent],
  templateUrl: './hud-attributes.component.html',
  styleUrls: ['./hud-attributes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudAttributesComponent {
  @Input({ required: true }) public game!: HTMLElement;

  // Dependency Injections
  private readonly _playerService = inject(PlayerService);

  // Streams
  public player$ = this._playerService.player$;
  private _hudStartingPosition$ = new BehaviorSubject<Point>({ x: 0, y: 0 });
  public hudStartingPosition$ = this._hudStartingPosition$.asObservable();

  // Variables
  public hudStartingPosition!: Point;

  // Functions
  public ngOnInit(): void {
    this._hudStartingPosition$.next({ x: 0, y: 183 });
    this.hudStartingPosition = this._hudStartingPosition$.value;
  }
}
