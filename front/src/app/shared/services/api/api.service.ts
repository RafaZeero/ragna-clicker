import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { AudioConfig, MonsterResponseFromAPI, Player } from '@shared/models';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _http = inject(HttpClient);
  private readonly _store = inject(StoreService);
  public ragnarok = 'online';

  // Saving in localstorage at the moment
  public savePlayer(player: Player) {
    return this._store.savePlayer(player);
  }

  public getPlayer() {
    return this._store.getPlayer();
  }

  public saveConfig(config: AudioConfig) {
    return this._store.saveConfigs(config);
  }

  public getConfig() {
    return this._store.getConfigs();
  }

  public getMonster(id: number): Observable<MonsterResponseFromAPI['response']> {
    return this._http
      .get<MonsterResponseFromAPI>(`${environment.apiURL}/monsters/${id}`)
      .pipe(map(data => data.response));
  }

  public getImage(id: number) {
    return this._http.get<MonsterResponseFromAPI>(`${environment.apiURL}/monsters/${id}`);
  }
}
