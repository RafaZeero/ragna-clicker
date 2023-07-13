import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rag-monster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonsterComponent {
  @Input({ required: true })
  public monsterImage!: number;
}
