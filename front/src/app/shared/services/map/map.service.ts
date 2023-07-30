import { Injectable, inject } from '@angular/core';
import { GameMechanicsService } from '../game-mechanics';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private readonly _gameMechanics = inject(GameMechanicsService);

  public currentMap$ = this._gameMechanics.currentMap$;
}
