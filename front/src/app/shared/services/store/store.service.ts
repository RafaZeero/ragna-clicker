import { Injectable } from '@angular/core';
import { AudioConfig, Player } from '@shared/models';
import * as IO from 'fp-ts/lib/IO';
import * as O from 'fp-ts/lib/Option';
import * as E from 'fp-ts/lib/Either';
import { flow, pipe } from 'fp-ts/lib/function';

const getItem = (key: string): IO.IO<O.Option<string>> => IO.of(() => O.fromNullable(localStorage.getItem(key)))();

const setItem = (key: string, value: string): IO.IO<void> => IO.of(() => localStorage.setItem(key, value));
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
    return pipe(
      /** Try to get local storage item */
      E.tryCatch(
        () =>
          pipe(
            /** Try to get config in local storage */
            getItem(this._localStorageConfig),
            /** Get item or send error [CONFIG NOT FOUND] (TODO!!) */
            IO.map(flow(O.getOrElse(() => 'Config not found'))),
          )(),
        /** On error, send the text! */
        () => 'Error to get configurations',
      ),
      E.bimap(
        error => {
          /** On left, send the text! */
          console.warn(error);
          /** return null */
          return null;
        },
        /** On right, parse the data and type cast it*/
        (data): AudioConfig => JSON.parse(data),
      ),
    );
  }
}
