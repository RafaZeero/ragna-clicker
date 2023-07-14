import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
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
  @HostBinding('style.height.%')
  public hostHeight = 75;

  public hudState = true;

  public toggleHud() {
    this.hudState = !this.hudState;
    this.hostHeight = this.hudState ? 75 : 20;
  }
}
