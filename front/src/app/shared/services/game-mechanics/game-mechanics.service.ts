import { Injectable, ViewContainerRef, inject } from '@angular/core';
import { ApiService } from '../api';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { defaultPlayer } from '@shared/constants';
import { Player } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class GameMechanicsService {
  private readonly _api = inject(ApiService);

  /** For player service */
  // Change to current user player
  private _player$ = new BehaviorSubject<Player>(defaultPlayer);
  public player$ = this._player$.asObservable().pipe(shareReplay());

  public get player() {
    return this._player$.value;
  }

  public set player(data: Player) {
    this._player$.next(data);
  }

  // Basic click attack
  public attack(event: MouseEvent, hitbox: ViewContainerRef) {
    //TODO: add this with dextery!
    // const variableDmg = Math.floor(Math.random() * 5);

    // Damage dealt to monster
    const damageDealt = this.calculateDamageDealt();

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

  // TODO: Move to equip service
  public setWeaponDamage(weaponDamage: number) {
    const player = this.player;
    // Remove any damage from previous weapon
    this.unequipPreviousWeapon();
    // Calculate new weapon damage
    const newWeaponDamage = this.calculateTotalDamage(player, weaponDamage);
    const previousPlayerDamages = player.stats.damage;
    // Update player damage
    this.player = {
      ...player,
      stats: { damage: { ...previousPlayerDamages, weapon: newWeaponDamage } },
    };
    return newWeaponDamage;
  }

  // TODO: Move to equip service
  public unequipPreviousWeapon() {
    // TODO: Remove any other bonus that the weapon may provide
    this.player.stats.damage.weapon = 0;
  }

  public calculateDamageDealt = () =>
    this.player.stats.damage.base + this.player.stats.damage.weapon + this.player.stats.damage.skills;
}
