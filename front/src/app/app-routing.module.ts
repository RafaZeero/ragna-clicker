import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthGuard, logoutUser } from './guards/is-auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home.component'),
    title: 'Ragna clicker',
  },
  {
    path: 'play',
    loadComponent: () => import('./pages/game/game.component'),
    title: 'Ragna clicker',
    canActivate: [isAuthGuard],
    canDeactivate: [logoutUser],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
