import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from '../player/player.component';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
@Component({
  selector: 'rag-hud',
  standalone: true,
  imports: [CommonModule, PlayerComponent, CdkDrag, CdkDragHandle],
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudComponent {
  @Input({ required: true }) public boundaryParentContainer!: HTMLElement;

  public hudState = true;

  public toggleHud() {
    this.hudState = !this.hudState;
  }
}
