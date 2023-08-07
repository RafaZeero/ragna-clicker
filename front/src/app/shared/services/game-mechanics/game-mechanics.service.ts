import { DestroyRef, Injectable, ViewContainerRef, inject } from '@angular/core';
import { ApiService } from '../api';
import { BehaviorSubject, Observable, Subject, combineLatest, delay, filter, map, shareReplay, tap } from 'rxjs';
import { POINTS_PER_LEVEL, defaultPlayer } from '@shared/constants';
import { Attributes, AudioConfig, GameMaps, MonsterData, MonsterResponseFromAPI, Player, Stats } from '@shared/models';
import { HitboxComponent } from '@components';
import { makeAdd, makeCalculate, makePlaySound } from '@shared/utils';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { isNil } from 'lodash';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class GameMechanicsService {
  private readonly _api = inject(ApiService);
  private readonly _destroyRef = inject(DestroyRef);

  // Create instances of sounds to play
  public gameSounds = makePlaySound();

  // Current player stream
  private _player$ = new BehaviorSubject<Player>(defaultPlayer);
  public player$ = this._player$.asObservable();

  // Current monster stream
  private _monster$ = new BehaviorSubject<MonsterData>({} as MonsterData);
  public monster$ = this._monster$.asObservable();

  // Current monster hp
  private _hp$ = new BehaviorSubject<number>(0);
  public hp$ = this._hp$.asObservable();

  // All requested monsters
  private _allMonstersRequested$ = new BehaviorSubject<Array<MonsterResponseFromAPI['response']>>(
    [] as Array<MonsterResponseFromAPI['response']>,
  );
  public allMonstersRequested$ = this._allMonstersRequested$.asObservable();

  // Current monster helpers
  public loadMonster$ = this.hp$.pipe(
    takeUntilDestroyed(this._destroyRef),
    // Map monster current life
    map(currentHP => currentHP > 0),
  );

  public monsterLifeBar$ = combineLatest({
    currentHP: this.hp$,
    monsterData: this.monster$,
  }).pipe(
    map(
      ({
        currentHP,
        monsterData: {
          stats: { hp: totalHP },
        },
      }) => (currentHP / totalHP) * 100,
    ),
  );

  private _currentMap$ = new BehaviorSubject<GameMaps>('prontera-south');
  public currentMap$ = this._currentMap$.asObservable();

  private _config$ = new BehaviorSubject<AudioConfig>({ audio: { effectsVolume: 0.5, gameMusicVolume: 0.5 } });
  public config$ = this._config$.asObservable();

  //#region getters and setters
  // Current monster hp getter
  public get currentHP() {
    return this._hp$.getValue();
  }

  // Current monster hp setter
  public set currentHP(data: MonsterData['stats']['hp']) {
    this._hp$.next(data);
  }

  // Current monster data getter
  public get currentMonster() {
    return this._monster$.getValue();
  }

  // Current monster data setter
  public set currentMonster(data: MonsterData) {
    this._monster$.next(data);
  }

  // Current player data getter
  public get player() {
    return this._player$.getValue();
  }

  // Current player data setter
  public set player(data: Player) {
    this._player$.next(data);
  }

  // Current config data getter
  public get config() {
    return this._config$.getValue();
  }

  // Current config data setter
  public set config(data: AudioConfig) {
    this._config$.next(data);
  }

  // Current config data getter
  public get currentMap() {
    return this._currentMap$.getValue();
  }

  // Current currentMap data setter
  public set currentMap(data: GameMaps) {
    this._currentMap$.next(data);
  }

  // Current monsters requested data getter
  public get monstersRequested() {
    return this._allMonstersRequested$.getValue();
  }

  // Current monsters requested data getter
  public set monstersRequested(value: Array<MonsterResponseFromAPI['response']>) {
    this._allMonstersRequested$.next(value);
  }

  //#endregion

  // Basic click attack
  public attack(event: MouseEvent, hitbox: ViewContainerRef) {
    //TODO: add this with dextery!
    // const variableDmg = Math.floor(Math.random() * 5);

    // Damage dealt to monster
    const damageDealt = this.calculateDamageDealt();

    // Reduce monster hp
    this.makeDamageToMonster(damageDealt, event, hitbox);
  }

  public gainExp(monsterExp: MonsterData['exp']) {
    const player = this.player;

    const add = makeAdd(player);

    // Add exp to Player
    player.exp.current = add.expToPlayer(monsterExp);

    // Save in DB
    // TODO: Add call to backend and update player data in DB
    this.savePlayer(player);

    // Emits new exp values
    this.player = player;
  }

  public gainZenys(monster: MonsterData) {
    const player = this.player;

    const add = makeAdd(player);

    // Add zenys to Player
    player.zenys = add.zenyToPlayer(monster);

    // Save in DB
    // TODO: Add call to backend and update player data in DB
    this.savePlayer(player);

    // Emits new exp values
    this.player = player;
  }

  // Move to utils
  public giveRewards = () => {
    // Get exp
    this.gainExp(this.currentMonster.exp);

    // Get Zenys
    this.gainZenys(this.currentMonster);

    // Check if player has leveled up
    this.checkLevelUp();

    // New monster
    this.updateMonster();
  };

  // Check if player has leveled up
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
    const updatedAtkDamage = calculate.atkDamage();

    // Control
    const hasLeveldUp = updatedValues.hasLeveled;

    if (hasLeveldUp.base || hasLeveldUp.job) {
      // Play level up sound
      this.gameSounds.effects.playAudio('levelUp');

      if (hasLeveldUp.base) {
        console.log('Player leveled up [BASE]');
        const updatedPoints = calculate.attributesAvailable();

        // Update attributes points
        player.attributes.attributes_to_spend = updatedPoints;
      }
      if (hasLeveldUp.job) {
        console.log('Player leveled up [JOB]');
        const updateSKillPoint = calculate.skillPointsAvailable();

        // Update skill points
        player.skills.skills_to_spend = updateSKillPoint;
      }

      // Update Level
      player.level = updatedLevel;

      // Update exp values
      player.exp = {
        current: updatedExp,
        toLevelUp: calculate.expToNextLevel(),
      };

      // Update stats on level up
      player.stats = { damage: updatedAtkDamage };

      // Save in DB
      // TODO: Add call to backend and update player data in DB
      this.savePlayer(player);

      // Emits new exp values
      this.player = player;
    }
  }

  public addOnePointToAttribute(attribute: keyof Attributes) {
    if (this.player.attributes.attributes_to_spend <= 0) return;

    const add = makeAdd(this.player);

    // Updated attributes of a player
    const updatedAttributes: Attributes = add.attributeToPlayer(attribute);

    const calculate = makeCalculate(this.player);

    // Updated stats
    const updatedStats: Stats = { damage: calculate.atkDamage() };

    // Update player
    const updatedPlayer: Player = {
      ...this.player,
      attributes: {
        values: updatedAttributes,
        attributes_to_spend: this.player.attributes.attributes_to_spend - 1,
      },
      stats: updatedStats,
    };

    // Saving in the db
    this.savePlayer(updatedPlayer);

    // Emits new player attributes and stats value
    this.player = updatedPlayer;
  }

  public addOnePointToSkill(skill: keyof Player['skills']['passive']) {
    if (this.player.skills.skills_to_spend <= 0) return;

    const add = makeAdd(this.player);

    // Update skills of a player
    const updatedSkills: Player['skills']['passive'] = add.skillToPlayer(skill);

    const calculate = makeCalculate(this.player);

    // Updated stats
    const updatedStats: Stats = { damage: calculate.atkDamage() };

    // Update player
    const updatedPlayer: Player = {
      ...this.player,
      skills: {
        passive: updatedSkills,
        skills_to_spend: this.player.skills.skills_to_spend - 1,
      },
      stats: updatedStats,
    };

    // Saving in the db
    this.savePlayer(updatedPlayer);

    // Emits new player attributes and stats value
    this.player = updatedPlayer;
  }

  public levelUp(type: 'base' | 'job') {
    const calculate = makeCalculate(this.player);

    // Calculate player new values
    const updatedValues = calculate.levelAndExp();
    const updatedExp = updatedValues.exp;
    const updatedLevel = updatedValues.level;
    const updatedAtkDamage = calculate.atkDamage();
    const updatedPoints = calculate.attributesAvailable();
    const updateSKillPoint = calculate.skillPointsAvailable();

    // TODO
    if (type === 'base') {
    }
    if (type === 'job') {
    }
  }

  // There is a bug in this Debugger, EXP is not updating. Since it is just a debugger, I don't care hehe
  public levelUpBase() {
    const level = { base: this.player.level.base + 1, job: this.player.level.job };
    const attr = {
      values: this.player.attributes.values,
      attributes_to_spend: this.player.attributes.attributes_to_spend + 1,
    };

    this.player = {
      ...this.player,
      level: level,
      attributes: attr,
    };
  }

  // There is a bug in this Debugger, EXP is not updating. Since it is just a debugger, I don't care hehe
  public levelUpJob() {
    const level = { base: this.player.level.base, job: this.player.level.job + 1 };
    const skills = {
      passive: this.player.skills.passive,
      skills_to_spend: this.player.skills.skills_to_spend + POINTS_PER_LEVEL.skills,
    };

    this.player = {
      ...this.player,
      level,
      skills,
    };
  }

  // save player in db
  public savePlayer(player: Player) {
    this._api.savePlayer(player);
  }

  // Load player from db
  public async loadPlayer() {
    pipe(
      /** Load config */
      await this._api.getPlayer(),
      /** Validate from DB */
      E.fold(
        /** On Left */
        error => {
          /** Save new config */
          this._api.savePlayer(this.player);
          /** Show error on console */
          console.error(error);
        },
        /** On Right */
        player => {
          /** Update current player */
          this.player = player;
        },
      ),
    );
  }
  // ******************************************************

  // Damage monster
  public makeDamageToMonster(damage: number, event: MouseEvent, hitbox: ViewContainerRef): void {
    const currentHP = this._hp$.value;

    // Only do damage if the monster is alive
    if (currentHP > 0) {
      this.showDamageOnScreen(damage, event, hitbox);
      this._hp$.next(currentHP - damage);
    }
  }

  // Reload monster after it dies
  public reloadMonster(): Observable<boolean> {
    return this.loadMonster$.pipe(
      filter(isAlive => !isAlive),
      // reload after 350 ms
      delay(350),
      tap(() => this.giveRewards()),
    );
  }

  // Recover monster hp
  public updateMonster(): void {
    const monsterData = this._monster$.getValue();

    if (!isNil(monsterData)) {
      // TODO: random choose next monster
      const totalHP = monsterData.stats.hp;
      this._hp$.next(totalHP);
    }
  }

  public calculateDamageDealt = () =>
    this.player.stats.damage.base + this.player.stats.damage.weapon + this.player.stats.damage.skills;

  // Show current damage number on screen when clicked on attack area
  public showDamageOnScreen(damage: number, event: MouseEvent, hitbox: ViewContainerRef, color?: string) {
    const componentRef = hitbox.createComponent<HitboxComponent>(HitboxComponent);

    const box = componentRef.location.nativeElement as HTMLElement;

    // Make color different for specific damages type
    componentRef.instance.color = color ?? '#ffffff';

    if (event.clientX > 0 || event.clientY > 0) {
      // Make damage appears wherever the user clicks
      box.style.left = event.clientX - 35 + 'px';
      box.style.top = event.clientY - 50 + 'px';
    } else {
      box.style.left = document.body.scrollWidth / 2 - 35 + 'px';
      box.style.top = document.body.scrollHeight / 2 - 50 + 'px';
    }

    componentRef.instance.damage = damage;

    // Set a timeout to hide the hitbox after 1500 milliseconds
    setTimeout(() => {
      componentRef.destroy();
    }, 1500);
  }

  /** Load config from API */
  public async loadConfig() {
    pipe(
      /** Load config */
      await this._api.getConfig(),
      /** Validate from DB */
      E.fold(
        /** On Left */
        error => {
          /** Save new config */
          this._api.saveConfig(this.config);
          /** Show error on console */
          console.error(error);
        },
        /** On Right */
        configs => {
          /** Update current config */
          this.config = configs;
          /** Set volumes to match saved data */
          this.gameSounds.effects.setVolume(configs.audio.effectsVolume);
          this.gameSounds.gameMusic.setVolume(configs.audio.gameMusicVolume);
        },
      ),
    );
  }

  public changeMap() {}

  // For debuggin purposes
  public debug() {
    return {
      resetPlayer: () => {
        this.player = defaultPlayer;
        this.savePlayer(defaultPlayer);
      },
    };
  }
}
