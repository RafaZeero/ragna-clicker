import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _user$ = new BehaviorSubject<string | null>(null);
  public readonly user$ = this._user$.asObservable();

  public set user(data: string | null) {
    this._user$.next(data);
  }

  public get user() {
    return this._user$.getValue();
  }
}
