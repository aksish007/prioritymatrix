import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'darkMode';
  private isDarkMode = new BehaviorSubject<boolean>(this.loadThemePreference());
  isDarkMode$ = this.isDarkMode.asObservable();

  constructor() {
    this.applyTheme(this.isDarkMode.value);
  }

  private loadThemePreference(): boolean {
    const savedPreference = localStorage.getItem(this.THEME_KEY);
    return savedPreference ? JSON.parse(savedPreference) : false;
  }

  private saveThemePreference(isDark: boolean): void {
    localStorage.setItem(this.THEME_KEY, JSON.stringify(isDark));
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  toggleTheme() {
    const newTheme = !this.isDarkMode.value;
    this.isDarkMode.next(newTheme);
    this.saveThemePreference(newTheme);
    this.applyTheme(newTheme);
  }

  getCurrentTheme(): boolean {
    return this.isDarkMode.value;
  }
}
