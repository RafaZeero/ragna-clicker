import { OnInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { makeMapFileURL } from '@shared/utils';
import { GameMaps } from '@shared/models';
import { HudService, MapService } from '@shared/services';

@Component({
  selector: 'rag-map-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-selection.component.html',
  styleUrls: ['./map-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapSelectionComponent implements OnInit {
  private readonly _mapService = inject(MapService);
  private readonly _hudService = inject(HudService);

  public mapsName: Array<GameMaps> = ['prontera-south', 'prontera-sewer'];
  public mapUrl!: Array<{ asset: ReturnType<typeof makeMapFileURL>['url']; name: GameMaps }>;

  // Update map
  public ngOnInit(): void {
    this.mapUrl = this.mapsName.map(map => ({ asset: makeMapFileURL(map).url, name: map }));
  }

  public selectMap(map: GameMaps): void {
    console.log('map selected', map);
    this._mapService.currentMap = map;
    // TODO: Add confirmation and untoggle map?
    // this._hudService.controlPlayerHud('maps');
  }

  public trackByMap = (index: number): number => index;
}
