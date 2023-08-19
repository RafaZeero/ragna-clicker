import { Injectable } from '@angular/core';
import { AudioConfig, Player } from '@shared/models';
import * as IO from 'fp-ts/lib/IO';
import * as O from 'fp-ts/lib/Option';
import * as E from 'fp-ts/lib/Either';
import { flow, identity, pipe } from 'fp-ts/lib/function';

const getItem = (key: string): IO.IO<O.Option<string>> => IO.of(() => O.fromNullable(localStorage.getItem(key)))();

const setItem = (key: string, value: string): IO.IO<void> => IO.of(() => localStorage.setItem(key, value));

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _localStoragePlayer = 'playerInfo';
  private _localStorageConfig = 'playerconfigs';

  public clearLocalStorage() {
    localStorage.removeItem(this._localStorageConfig);
    localStorage.removeItem(this._localStoragePlayer);
    localStorage.removeItem('userLogged');
  }

  public async savePlayer(data: Player) {
    try {
      const playerData = JSON.stringify(data);
      localStorage.setItem(this._localStoragePlayer, playerData);

      return 'User saved';
    } catch (error) {
      return 'An error has occured';
    }
  }

  public async getPlayer(): Promise<E.Either<string, Player>> {
    return pipe(
      /** Try to get local storage item */
      E.tryCatch(
        () =>
          pipe(
            /** Try to get player in local storage */
            getItem(this._localStoragePlayer),
            /** Get item or send error [PLAYER NOT FOUND] (TODO!!) */
            IO.map(flow(E.fromOption(() => 'Player not found'))),
          )(),
        /** On error, send the text! */
        () => 'Error to get player info in DB',
      ),
      E.flattenW,
      E.bimap(
        /** return error message */
        identity,
        /** On right, parse the data and type cast it*/
        (data): Player => JSON.parse(data),
      ),
    );
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

  public async getConfigs(): Promise<E.Either<string, AudioConfig>> {
    return pipe(
      /** Try to get local storage item */
      E.tryCatch(
        () =>
          pipe(
            /** Try to get config in local storage */
            getItem(this._localStorageConfig),
            /** Get item or send error [CONFIG NOT FOUND] (TODO!!) */
            IO.map(flow(E.fromOption(() => 'Config not found'))),
          )(),
        /** On error, send the text! */
        () => 'Error to get configurations in DB',
      ),
      E.flattenW,
      E.bimap(
        /** return error message */
        identity,
        /** On right, parse the data and type cast it*/
        (data): AudioConfig => JSON.parse(data),
      ),
    );
  }
}
