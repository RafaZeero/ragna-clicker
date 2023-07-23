import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { defaultPlayer } from '@shared/constants';
import { Attributes, MonsterData, Player, Stats } from '@shared/models';
import { addAttributeToPlayer, addExp, makeCalculate, expNeededToLevelUp } from '@shared/utils';
import { ApiService } from '../api';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly _api = inject(ApiService);

  // Change to current user player
  private _player$ = new BehaviorSubject<Player>(defaultPlayer);
  public player$ = this._player$.asObservable().pipe(shareReplay());

  public get player() {
    return this._player$.value;
  }

  public set player(data: Player) {
    this._player$.next(data);
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

    // Instantiate calculations
    const calculate = makeCalculate(this.player);

    // Calculate player new values
    const updatedValues = calculate.levelAndExp();
    const updatedExp = updatedValues.exp;
    const updatedLevel = updatedValues.level;
    const updatedStats = this.updateStats();

    // Control
    const hasLeveldUp = updatedValues.hasLeveled;

    if (hasLeveldUp.base || hasLeveldUp.job) {
      if (hasLeveldUp.base) {
        console.log('Player leveled up [BASE]');

        const updatedPoints = calculate.attributesAvailable();

        // Update attributes points
        player.attributes_to_spend = updatedPoints;
      }
      if (hasLeveldUp.job) {
        console.log('Player leveled up [JOB]');
        const updateSKillPoint = calculate.skillPoints();

        // Update skill points
        player.skills.skill_points = updateSKillPoint;
      }

      // Update Level
      player.level = updatedLevel;

      // Update exp values
      player.exp = {
        current: updatedExp,
        toLevelUp: expNeededToLevelUp(updatedLevel),
      };

      // Update stats on level up
      player.stats = updatedStats;

      // Saving in the db
      // TODO: Add call to backend and update player data in DB
      this._api.savePlayer(player);

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
    const updatedStats = this.updateStats();

    // Update player
    const player: Player = {
      ...this.player,
      attributes: updatedAttributes,
      attributes_to_spend: this.player.attributes_to_spend - 1,
      stats: updatedStats,
    };

    // Saving in the db
    this._api.savePlayer(player);

    // Emits new player attributes
    this._player$.next(player);
  }

  public updateStats(): Stats {
    // Instantiate calculations
    const calculate = makeCalculate(this.player);

    // Calculate new damage
    const updatedAtkDamage = calculate.atkDamage();

    return { damage: updatedAtkDamage };
  }

  public reset() {
    this._player$.next(defaultPlayer);
    this.updateStats();
    this._api.savePlayer(defaultPlayer);
  }

  public levelUpBase() {
    const level = this.player.level;
    const attr = this.player.attributes_to_spend;
    this._player$.next({
      ...this.player,
      level: { base: level.base + 1, job: level.job },
      attributes_to_spend: attr + 3,
    });
    this.updateStats();
  }

  public levelUpJob() {
    const level = this.player.level;
    this._player$.next({ ...this.player, level: { job: level.job + 1, base: level.base } });
    this.updateStats();
  }

  public calculateDamageDealt = () => this.player.stats.damage.base + this.player.stats.damage.weapon;
}
