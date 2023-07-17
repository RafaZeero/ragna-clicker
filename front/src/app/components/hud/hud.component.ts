import { ChangeDetectionStrategy, Component, HostListener, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { ButtonRoundedComponent } from '../button-rounded';
import { PlayerInfoComponent } from '../player-info';
@Component({
  selector: 'rag-hud',
  standalone: true,
  imports: [CommonModule, CdkDrag, CdkDragHandle, PlayerInfoComponent, ButtonRoundedComponent],
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudComponent {
  @Input({ required: true }) public boundaryParentContainer!: HTMLElement;
  @ViewChild('toggle') public toggle!: HTMLElement;

  public hudState = true;
  public hudStateTop = true;

  public toggleHud() {
    this.hudState = !this.hudState;
    this.hudStateTop = !this.hudStateTop;
  }
}
