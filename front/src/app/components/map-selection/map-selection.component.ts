import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rag-map-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-selection.component.html',
  styleUrls: ['./map-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapSelectionComponent {

}
