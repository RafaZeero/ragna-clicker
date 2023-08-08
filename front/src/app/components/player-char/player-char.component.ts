import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rag-player-char',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-char.component.html',
  styleUrls: ['./player-char.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerCharComponent {

}
