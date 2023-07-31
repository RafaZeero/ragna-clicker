import { Injectable, inject } from '@angular/core';
import { GameMechanicsService } from '../game-mechanics';
import { GameMaps } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private readonly _gameMechanics = inject(GameMechanicsService);

  public currentMap$ = this._gameMechanics.currentMap$;

  // Current config data getter
  public get currentMap() {
    return this._gameMechanics.currentMap;
  }

  // Current currentMap data setter
  public set currentMap(data: GameMaps) {
    this._gameMechanics.currentMap = data;
  }
}
