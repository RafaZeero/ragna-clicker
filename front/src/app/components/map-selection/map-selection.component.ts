import { OnInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { makeMapFileURL } from '@shared/utils';
import { GameMaps } from '@shared/models';

@Component({
  selector: 'rag-map-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-selection.component.html',
  styleUrls: ['./map-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapSelectionComponent implements OnInit {
  public mapName: GameMaps = 'prontera-south';
  public mapUrl!: ReturnType<typeof makeMapFileURL>['url'];

  // Update map
  public ngOnInit(): void {
    this.mapUrl = makeMapFileURL(this.mapName).url;
  }
}
