import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  private userIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  userId$: Observable<string | null> = this.userIdSubject.asObservable();

  constructor(private auth: Auth) {
    this.auth.onAuthStateChanged(user => {
      this.userSubject.next(user);
      this.userIdSubject.next(user?.uid || null);
    });
  }

  async signInWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return !!this.auth.currentUser;
  }

  // Gnenerate a functiion called getCurrentUser() that returns the current user
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
