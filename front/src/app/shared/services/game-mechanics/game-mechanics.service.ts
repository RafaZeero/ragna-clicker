import { Injectable, ViewContainerRef, inject } from '@angular/core';
import { PlayerService } from '../player';
import { MonsterService } from '../monster';
import { ApiService } from '../api';

@Injectable({
  providedIn: 'root',
})
export class GameMechanicsService {
  private readonly _api = inject(ApiService);
  private readonly _playerService = inject(PlayerService);
  private readonly _monsterService = inject(MonsterService);

  // Basic click attack
  public attack(event: MouseEvent, hitbox: ViewContainerRef) {
    //TODO: add this with dextery!
    // const variableDmg = Math.floor(Math.random() * 5);

    // Damage dealt to monster
    const damageDealt = this._playerService.calculateDamageDealt();

    // Reduce monster hp
    this._monsterService.makeDamageToMonster(damageDealt, event, hitbox);
  }

  // Move to utils
  public giveExp = () => {
    // // Get exp
    this._playerService.gainExp(this._monsterService.currentMonster.exp);

    // Check if player has leveled up
    this._playerService.checkLevelUp();

    // New monster
    this._monsterService.updateMonster();
  };

  // Load player from db
  public async loadPlayer() {
    // TODO: change localstorage to db
    const playerInfoFromDB = await this._api.getPlayer();

    if (playerInfoFromDB) {
      console.log('player info [LOCAL_STORAGE]: ', playerInfoFromDB);
      this._playerService.player = playerInfoFromDB;
    } else {
      console.log('saving initial data [LOCAL_STORAGE]');
      this._api.savePlayer(this._playerService.player);
    }

    const playerStats = this._playerService.updateStats();
    this._playerService.player = { ...this._playerService.player, stats: playerStats };
  }
}
