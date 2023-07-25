import { Directive, ViewContainerRef, inject } from '@angular/core';

@Directive({
  selector: '[ragHitbox]',
  standalone: true,
})
export class HitboxDirective {
  public readonly viewContainerRef = inject(ViewContainerRef);
}
