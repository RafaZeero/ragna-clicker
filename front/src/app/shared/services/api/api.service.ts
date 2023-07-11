import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { MonsterRequest } from '@shared/models';
import { mapMonsterData } from '../../utils/api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _http = inject(HttpClient);
  private divinePrideUrl = `https://www.divine-pride.net/api/database`;
  public ragnarok = 'online';

  public getMonster(id: number) {
    return this._http
      .get<MonsterRequest>(`${this.divinePrideUrl}/Monster/${id}`, {
        params: { apiKey: environment.apiKey['divine-pride'] },
      })
      .pipe(
        map(mapMonsterData),
        switchMap(monsterInfo =>
          this._http.get(`http://localhost:3000/monsters/${id}`).pipe(map(img => ({ ...monsterInfo, img }))),
        ),
      );
  }

  public getImage(id: number) {
    return this._http.get(`http://localhost:3000/monsters/${id}`);
  }
}
