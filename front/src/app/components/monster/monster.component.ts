import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MonsterService } from '@shared/services';

@Component({
  selector: 'rag-monster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonsterComponent {
  private readonly _monsterService = inject(MonsterService);

  @ViewChild('monster')
  public element!: ElementRef;

  @Input({ required: true })
  public image$!: Observable<string>;

  public monsterHPBar$ = this._monsterService.monsterLifeBar$;
}
