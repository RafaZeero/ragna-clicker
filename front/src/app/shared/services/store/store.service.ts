import { Injectable } from '@angular/core';
import { Player } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _localStorageKeyName = 'playerInfo';

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
      console.log('Error to get player');
      return null;
    }
  }
}
