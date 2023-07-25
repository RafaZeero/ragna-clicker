import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rag-hitbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hitbox.component.html',
  styleUrls: ['./hitbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HitboxComponent {

}
