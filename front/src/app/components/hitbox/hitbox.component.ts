import { ChangeDetectionStrategy, Component, ViewChild, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rag-hitbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hitbox.component.html',
  styleUrls: ['./hitbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HitboxComponent implements OnInit {
  @Input() public color = '#ffffff';

  public damageColor!: string;

  public damage!: number;

  public ngOnInit(): void {
    this.damageColor = this.color;
  }
}
