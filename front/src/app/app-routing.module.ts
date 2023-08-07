import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthGuard, logoutUser } from './guards/is-auth.guard';
import { environment } from './environments/environment';

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

const devRoutes: Routes = [
  {
    path: 'play',
    loadComponent: () => import('./pages/game/game.component'),
    title: 'Ragna clicker',
  },
  {
    path: '**',
    redirectTo: 'play',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(environment.type === 'development' ? devRoutes : routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
