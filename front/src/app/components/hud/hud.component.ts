import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragHandle, CdkDragEnd, Point, CdkDragDrop } from '@angular/cdk/drag-drop';
import { ButtonRoundedComponent } from '../button-rounded';
import { PlayerInfoComponent } from '../player-info';
import { BehaviorSubject } from 'rxjs';
import { INITIAL_POSITION } from '@shared/constants';
import { HudService } from '@shared/services';
@Component({
  selector: 'rag-hud',
  standalone: true,
  imports: [CommonModule, CdkDrag, CdkDragHandle, PlayerInfoComponent, ButtonRoundedComponent],
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudComponent {
  @Input({ required: true }) public boundaryParentContainer!: HTMLElement;
  @Input({ required: true, alias: 'cdkDragFreeDragPosition' }) public set startPosition(position: Point) {
    this._hudStartingPosition$.next(position);
  }

  @Input() public toggleable = true;

  // @ViewChild('toggle') public toggle!: HTMLElement;

  private readonly _hudService = inject(HudService);

  public hudState = true;
  public hudStateTop = true;

  private _hudStartingPosition$ = new BehaviorSubject<Point>(INITIAL_POSITION.info);
  public hudStartingPosition$ = this._hudStartingPosition$.asObservable();

  public get hudStartingPosition() {
    return this._hudStartingPosition$.getValue();
  }

  // Actions
  public toggleHud() {
    this.hudState = !this.hudState;
    this.hudStateTop = !this.hudStateTop;
  }

  public updatePosition(cdkDragEndEvent: CdkDragEnd) {
    const { source } = cdkDragEndEvent;

    // Get position after drag within bound limits
    const updatedPosition: Point = {
      x: source._dragRef['_passiveTransform'].x,
      y: source._dragRef['_passiveTransform'].y,
    };

    // TODO: Improve this, there must be another way to get the element
    if (this._findElementWithName('skills', source)) {
      this._hudService.saveHudPosition({ skills: updatedPosition });
    }

    if (this._findElementWithName('attributes', source)) {
      this._hudService.saveHudPosition({ attr: updatedPosition });
    }

    if (this._findElementWithName('info', source)) {
      this._hudService.saveHudPosition({ info: updatedPosition });
    }

    if (this._findElementWithName('equipments', source)) {
      this._hudService.saveHudPosition({ equip: updatedPosition });
    }

    if (this._findElementWithName('config', source)) {
      this._hudService.saveHudPosition({ config: updatedPosition });
    }
  }

  private _findElementWithName(name: string, source: CdkDragEnd['source']): boolean {
    return source.element.nativeElement.children[1].children[0].tagName.toLowerCase().includes(name);
  }
}
