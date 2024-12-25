import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'matrix', component: LandingComponent }, // We'll update this later to the actual matrix view
  { path: '**', redirectTo: '' }
];
