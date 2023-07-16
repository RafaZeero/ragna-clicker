import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rag-button-rounded',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-rounded.component.html',
  styleUrls: ['./button-rounded.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonRoundedComponent {

}
