import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HudComponent, PlayerAttributesComponent } from '@components';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PlayerService } from '@shared/services';

@Component({
  selector: 'rag-hud-attributes',
  standalone: true,
  imports: [CommonModule, DragDropModule, HudComponent, PlayerAttributesComponent],
  templateUrl: './hud-attributes.component.html',
  styleUrls: ['./hud-attributes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudAttributesComponent {
  private readonly _playerService = inject(PlayerService);

  public player$ = this._playerService.player$;

  @Input({ required: true }) public game!: HTMLElement;
}
