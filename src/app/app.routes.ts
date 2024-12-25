import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { authGuard } from './guards/auth.guard';
import { PlaygroundComponent } from './playground/playground.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'matrix', component: PlaygroundComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
