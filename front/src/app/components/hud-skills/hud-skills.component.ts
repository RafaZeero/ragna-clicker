import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Point } from '@angular/cdk/drag-drop';
import { PlayerService } from '@shared/services';
import { BehaviorSubject } from 'rxjs';
import { HudComponent } from '../hud/hud.component';
import { PlayerSkillsComponent } from '../player-skills';

@Component({
  selector: 'rag-hud-skills',
  standalone: true,
  imports: [CommonModule, HudComponent, PlayerSkillsComponent],
  templateUrl: './hud-skills.component.html',
  styleUrls: ['./hud-skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudSkillsComponent {
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
