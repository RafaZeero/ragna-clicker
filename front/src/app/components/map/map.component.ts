import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonsterComponent } from 'src/app/components/monster';
import { makeMapFileURL } from '@shared/utils';
import { MapService } from '@shared/services';

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
export class MapComponent implements AfterViewInit {
  private readonly _mapService = inject(MapService);

  @ViewChild('map')
  public element!: ElementRef;

  public map = this._mapService.currentMap$;

  // Update map
  public ngAfterViewInit(): void {
    this._mapService.currentMap$.subscribe(map => {
      console.log({ map });
      this.element.nativeElement.style.background = makeMapFileURL(map).css;
      this.element.nativeElement.style.backgroundSize = 'cover';
    });
  }
}
