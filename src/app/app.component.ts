import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputTaskComponent } from './input-task/input-task.component';
import { MatrixComponent } from './matrix/matrix.component';
import { AngularSplitModule } from 'angular-split';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';
import { Observable } from 'rxjs';

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
  isDarkMode$: Observable<boolean>;

  constructor(private themeService: ThemeService) {
    this.isDarkMode$ = this.themeService.isDarkMode$;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  getThemeIcon(): string {
    let icon = 'light_mode';
    this.isDarkMode$.subscribe(isDarkMode => {
      icon = isDarkMode ? 'dark_mode' : 'light_mode';
    });
    return icon;
  }
  
}
