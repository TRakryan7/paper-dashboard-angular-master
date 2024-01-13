import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
  constructor() {}
  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('auth');
    if(!token) return false;
    return true;
  }
}