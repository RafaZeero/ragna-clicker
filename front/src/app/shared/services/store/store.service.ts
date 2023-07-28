import { Injectable } from '@angular/core';
import { AudioConfig, Player } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _localStorageKeyName = 'playerInfo';
  private _localStorageConfig = 'playerconfigs';

  public async savePlayer(data: Player) {
    try {
      const playerData = JSON.stringify(data);

      localStorage.setItem(this._localStorageKeyName, playerData);

      return 'User saved';
    } catch (error) {
      return 'An error has occured';
    }
  }

  public async getPlayer(): Promise<Player | null> {
    try {
      const fromLocalStorage = localStorage.getItem(this._localStorageKeyName);

      if (!fromLocalStorage) {
        throw Error('User not found');
      }
      const player = JSON.parse(fromLocalStorage) as Player;

      return player;
    } catch (error) {
      console.warn('Error to get player');
      return null;
    }
  }

  public async saveConfigs(data: AudioConfig) {
    try {
      const configData = JSON.stringify(data);

      localStorage.setItem(this._localStorageConfig, configData);

      return 'Config saved';
    } catch (error) {
      return 'An error has occured';
    }
  }

  public async getConfigs() {
    try {
      const fromLocalStorage = localStorage.getItem(this._localStorageConfig);

      if (!fromLocalStorage) {
        throw Error('Config not found');
      }

      const configs = JSON.parse(fromLocalStorage) as AudioConfig;

      return configs;
    } catch (error) {
      console.warn('Error to get configurations');
      return null;
    }
  }
}
