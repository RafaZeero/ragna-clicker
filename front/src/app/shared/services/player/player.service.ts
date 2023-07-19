import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { defaultPlayer, expToLevelUp } from '@shared/constants';
import { Attributes, MonsterData, Player } from '@shared/models';
import { addAttributeToPlayer, addExp, calculate, expNeededToLevelUp } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  // Change to current user player
  private _player$ = new BehaviorSubject<Player>(defaultPlayer);
  public player$ = this._player$.asObservable().pipe(shareReplay());

  public get player() {
    return this._player$.value;
  }

  public set player(data: Player) {
    this._player$.next(data);
  }

  public calculate = calculate(this.player);

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
    const player = this.player;

    // Do not level up job
    if (player.level.job === 50) {
      // TODO: Stop leveling up
      console.log('Player level max [JOB]');
      return;
    }

    // Do not level up base
    if (player.level.base === 99) {
      // TODO: Stop leveling up
      console.log('Player level max [BASE]');
      return;
    }

    // Calculate player new values
    const updatedValues = this.calculate.levelAndExp();
    const updatedExp = updatedValues.exp;
    const updatedLevel = updatedValues.level;

    // Control
    const hasLeveldUp = updatedValues.hasLeveled;

    if (hasLeveldUp.base || hasLeveldUp.job) {
      if (hasLeveldUp.base) {
        // TODO: Add call to backend and update player data in DB
        console.log('Player leveled up [BASE]');

        const updatedPoints = this.calculate.attributesAvailable();

        // Update attributes points
        player.attributes_to_spend = updatedPoints;
      }
      if (hasLeveldUp.job) {
        // TODO: Add call to backend and update player data in DB
        console.log('Player leveled up [JOB]');
      }

      // Update Level
      player.level = updatedLevel;

      // Update exp values
      player.exp = {
        current: updatedExp,
        toLevelUp: expNeededToLevelUp(updatedLevel),
      };

      this._player$.next(player);
    }
  }

  public gainExp(monsterExp: MonsterData['exp']) {
    const player = this.player;

    // Add exp to Player
    player.exp.current = addExp(this.player, monsterExp);

    // Emits new exp values
    this._player$.next(player);
  }

  // Move to utils
  private calculateTotalDamage(player: Player, weaponDamage: number) {
    // Add weaponType & weaponRefine to calc
    const damage = player.attributes.strength * 2 + weaponDamage;
    return damage;
  }

  public addOnePointToAttribute(attribute: keyof Attributes) {
    if (this.player.attributes_to_spend <= 0) return;
    // Update all attributes of a player
    const updatedAttributes = addAttributeToPlayer(attribute, this.player);

    // Update secondary stats
    // Calculate new damage
    const updatedAtkDamage = this.calculate.atkDamage();

    // Update player
    const player: Player = {
      ...this.player,
      attributes: updatedAttributes,
      attributes_to_spend: this.player.attributes_to_spend - 1,
      stats: { damage: updatedAtkDamage },
    };
    // Emits new player attributes
    this._player$.next(player);
  }

  public calculateDamageDealt = () => this.player.stats.damage.base + this.player.stats.damage.weapon;
}
