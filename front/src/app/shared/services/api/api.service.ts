import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { AudioConfig, MonsterResponseFromAPI, Player, User } from '@shared/models';
import { StoreService } from '../store/store.service';
import { Router } from '@angular/router';
import { UserService } from '../user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _http = inject(HttpClient);
  private readonly _store = inject(StoreService);
  private readonly _userService = inject(UserService);
  private readonly _router = inject(Router);
  public ragnarok = 'online';

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

  public login(user: Pick<User, 'email' | 'password'>) {
    type ResponseLogin = { response: { message: string; token: string; username: string } };

    return this._http.post<ResponseLogin>(`${environment.apiURL}/users/login`, user);
  }

  public signup(newUser: Omit<User, 'register_date'>) {
    type ResponseSignup = { response: { message: string; token: string; username: string } };
    return this._http.post<ResponseSignup>(`${environment.apiURL}/users/signup`, newUser);
  }

  public logout() {
    this._store.clearLocalStorage();
    this._userService.user = null;
    window.location.reload();
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
