import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonsterComponent } from 'src/app/components/monster';
import { makeMapFileURL } from '@shared/utils';
import { Maps } from '@shared/models';

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
  @ViewChild('map')
  public element!: ElementRef;

  @Input({ required: true })
  public map!: Maps;

  // Update map
  public ngAfterViewInit(): void {
    this.element.nativeElement.style.background = makeMapFileURL(this.map);
    this.element.nativeElement.style.backgroundSize = 'cover';
  }
}
