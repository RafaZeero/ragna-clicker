import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { defaultPlayer, expToLevelUp } from '@shared/constants';
import { Player } from '@shared/models';
import { calculateExpAfterLevelUp, calculateLevel } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  // Change to current user player
  private _player$ = new BehaviorSubject<Player>(defaultPlayer);
  public player$ = this._player$.asObservable();

  public get player() {
    return this._player$.value;
  }

  public set player(data: Player) {
    this._player$.next(data);
  }

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

  public unequipPreviousWeapon() {
    // TODO: Remove any other bonus that the weapon may provide
    this.player.stats.damage.weapon = 0;
  }

  public checkLevelUp() {
    const updatedPlayerLevel = calculateLevel(this.player);
    const updatedExpLevel = calculateExpAfterLevelUp(this.player);
    // Update Level
    this.player.level = { base: updatedPlayerLevel.baseLevel, job: updatedPlayerLevel.jobLevel };
    // Update exp values
    this.player.exp = {
      current: { base: updatedExpLevel.baseExp, job: updatedExpLevel.jobExp },
      toLevelUp: {
        base: expToLevelUp.base[updatedPlayerLevel.baseLevel],
        job: expToLevelUp.job[updatedPlayerLevel.jobLevel],
      },
    };
  }

  // Move to utils
  private calculateTotalDamage(player: Player, weaponDamage: number) {
    // Add weaponType & weaponRefine to calc
    const damage = player.attributes.strength * 2 + weaponDamage;
    return damage;
  }

  public calculateDamageDealt = () => this.player.stats.damage.base + this.player.stats.damage.weapon;
}
