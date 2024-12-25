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
    RouterLink,
  ],
})
export class LandingComponent {
  faqs = [
    {
      question: 'What is the Eisenhower Matrix?',
      answer:
        'The Eisenhower Matrix helps you organize tasks based on urgency and importance, improving decision-making and time management.',
    },
    {
      question: 'How does Priority Matrix help me?',
      answer:
        'It visualizes and organizes your tasks into quadrants, helping you focus on what matters most and improving productivity.',
    },
    {
      question: 'Can I save my tasks?',
      answer:
        'Yes! Tasks are automatically saved and accessible anytime by logging in with your Google account.',
    },
  ];

  constructor(public authService: AuthService) {}

  async signIn() {
    try {
      await this.authService.signInWithGoogle();
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  }

  async signOut() {
    try {
      await this.authService.signOut();
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  }
}
