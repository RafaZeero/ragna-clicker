import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonsterComponent } from 'src/app/components/monster';
import { ApiService } from '@shared/services';

/**
 * TODO: Dynamically change field maps
 * For now this will be only the map of Prontera field
 * Eventually it will render other maps
 */

@Component({
  selector: 'rag-map',
  standalone: true,
  imports: [CommonModule, MonsterComponent],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MapComponent {
  private readonly _api = inject(ApiService);

  public monsterImage!: any;

  public ngOnInit(): void {
    this._api.getImage(1002).subscribe(data => {
      console.log('aaaa');
      this.monsterImage = data;
    });
  }
}
