import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor() {
    this.checkLoginStatus();
  }

  private checkLoginStatus() {
    // Verifica si el código se está ejecutando en el navegador
    if (typeof window !== 'undefined' && window.localStorage) {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      this.loggedIn.next(isLoggedIn);
    }
  }

  login() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('isLoggedIn', 'true');
      this.loggedIn.next(true);
    }
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('isLoggedIn');
      this.loggedIn.next(false);
    }
  }
}
