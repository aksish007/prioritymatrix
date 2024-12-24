import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputTaskComponent } from './input-task/input-task.component';
import { MatrixComponent } from './matrix/matrix.component';
import { AngularSplitModule } from 'angular-split';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AngularSplitModule,
    InputTaskComponent,
    MatrixComponent,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'priority-matrix';
  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
