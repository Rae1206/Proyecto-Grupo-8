import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { usuario } from '../Interfaces/usuario'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();
  
  private userSubject = new BehaviorSubject<usuario | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    this.checkLoginStatus();
  }

  private isBrowser() {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  checkLoginStatus() {
    if (this.isBrowser()) {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      this.loggedIn.next(isLoggedIn);
      if (isLoggedIn) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        this.userSubject.next(user);
      }
    }
  }

  login(user: usuario) {
    if (this.isBrowser()) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(user));
      this.loggedIn.next(true);
      this.userSubject.next(user);
    }
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
    }
    this.loggedIn.next(false);
    this.userSubject.next(null);
  }
}
