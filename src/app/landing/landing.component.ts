import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    RouterLink
  ]
})
export class LandingComponent {
  constructor(public authService: AuthService) {}

  async signIn() {
    try {
      await this.authService.signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
    }
  }

  async signOut() {
    try {
      await this.authService.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }
  faqs = [
    {
      question: 'What is the Eisenhower Matrix?',
      answer: 'The Eisenhower Matrix is a productivity tool that helps you organize tasks based on their urgency and importance, enabling better decision-making and time management.'
    },
    {
      question: 'How does Priority Matrix help me?',
      answer: 'Priority Matrix helps you visualize and organize your tasks in four quadrants, making it easier to focus on what truly matters and improve your productivity.'
    },
    {
      question: 'Can I save my tasks?',
      answer: 'Yes! Your tasks are automatically saved and you can access them anytime by logging in with your Google account.'
    }
  ];
}
