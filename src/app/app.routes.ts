import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'matrix', component: LandingComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
