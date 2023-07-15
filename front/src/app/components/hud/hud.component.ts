import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'rag-hud',
  standalone: true,
  imports: [CommonModule, PlayerComponent],
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudComponent {
  public hudState = true;

  public toggleHud() {
    this.hudState = !this.hudState;
  }
}
