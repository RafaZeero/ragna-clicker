import type { OnInit } from '@angular/core';
import { Directive, ElementRef, HostListener, inject, Input } from '@angular/core';
import { isNil } from 'lodash';
import type { RippleOptions } from './ripple.helper';
import { createRipple, generatedStyles } from './ripple.helper';

@Directive({
  selector: '[uvRipple]',
  standalone: true,
})
export class RippleDirective implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  /** The ripple container, created on this._updateRipple */
  private _rippleContainer: HTMLDivElement | null = null;

  /** Any CSS accepted color format */
  private _color = 'rgb(255 255 255 / 25%)';

  /** Whether the ripple is currently disabled */
  private _disabled = false;

  /** Whether the ripple should be centered on the parent element */
  private _centered = false;

  @Input()
  public set rippleDisabled(value: boolean) {
    this._disabled = value;
    this._updateRipple(this._disabled);
  }

  @Input()
  public set rippleCentered(value: boolean) {
    this._centered = value;
  }

  @Input()
  public set rippleColor(value: string) {
    this._color = value;
  }

  @HostListener('pointerdown', ['$event'])
  public onPointerDown(event: PointerEvent): void {
    if (this._disabled) {
      return;
    }
    this._triggerRipple(event);
  }

  public ngOnInit(): void {
    this._elementRef.nativeElement.style.cssText += generatedStyles.rippleHost;
    this._updateRipple(this._disabled);
  }

  /** Manages the current element and the ripple container */
  private _updateRipple(disabled: boolean): void {
    // If the ripple is disabled, clean up everything
    if (disabled) {
      this._elementRef.nativeElement.removeAttribute('ripple');
      this._rippleContainer?.remove();
      this._rippleContainer = null;
      return;
    }

    // If the ripple container already exists, do nothing
    if (!isNil(this._rippleContainer)) {
      return;
    }

    // Create the ripple container and append it to the element
    this._elementRef.nativeElement.setAttribute('ripple', '');
    this._rippleContainer = document.createElement('div');
    this._rippleContainer.style.cssText += generatedStyles.rippleContainer;
    this._rippleContainer.setAttribute('aria-hidden', 'true');
    this._elementRef.nativeElement.insertBefore(this._rippleContainer, this._elementRef.nativeElement.firstChild);
  }

  private _triggerRipple(event: PointerEvent): void {
    if (isNil(this._rippleContainer)) {
      return;
    }
    const { offsetX, offsetY } = event;
    const options: RippleOptions = { centered: this._centered, color: this._color };
    createRipple(this._rippleContainer, { offsetX, offsetY }, options);
  }
}
