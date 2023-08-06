import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import GameComponent from '../pages/game/game.component';
import { UserService } from '../shared';

export const logoutUser: CanDeactivateFn<GameComponent> = component => {
  component.logout();
  return true;
};

export const isAuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const user = userService.user;

  return user ? true : router.navigateByUrl('/');
};
