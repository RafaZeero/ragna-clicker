import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { MonsterRequest, Player } from '@shared/models';
import { mapMonsterData } from '../../utils/api';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _http = inject(HttpClient);
  private readonly _store = inject(StoreService);
  private divinePrideUrl = `https://www.divine-pride.net/api/database`;
  public ragnarok = 'online';

  // Saving in localstorage at the moment
  public savePlayer(player: Player) {
    return this._store.savePlayer(player);
  }

  public getPlayer() {
    return this._store.getPlayer();
  }

  public getMonster(id: number) {
    return this._http
      .get<MonsterRequest>(`${this.divinePrideUrl}/Monster/${id}`, {
        params: { apiKey: environment.apiKey['divine-pride'] },
      })
      .pipe(
        map(mapMonsterData),
        switchMap(monsterInfo =>
          this._http.get<string>(`http://localhost:3000/monsters/${id}`).pipe(map(img => ({ ...monsterInfo, img }))),
        ),
      );
  }

  public getImage(id: number) {
    return this._http.get<string>(`http://localhost:3000/monsters/${id}`);
  }
}
