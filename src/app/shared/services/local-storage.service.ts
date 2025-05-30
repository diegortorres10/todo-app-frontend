import { Injectable } from '@angular/core';
import { User } from '../../core/infraestructure/interfaces/Auth/AuthResponse.interface';

const APP_PREFIX = 'TODO-LIST-APP-';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly USER_DATA_KEY = 'USER';
  // TODO: Considerar hacer métodos genéricos para registrar cualquier valor

  setUserData(userData: User): void {
    localStorage.setItem(
      `${APP_PREFIX}${this.USER_DATA_KEY}`,
      JSON.stringify(userData)
    );
  }

  getUserData(): User | null {
    const data = localStorage.getItem(`${APP_PREFIX}${this.USER_DATA_KEY}`);
    return data ? JSON.parse(data) : null;
  }

  removeUserData(): void {
    localStorage.removeItem(`${APP_PREFIX}${this.USER_DATA_KEY}`);
  }

  hasValidSession(): boolean {
    const user = this.getUserData();
    if (!this.getUserData()) {
      return false;
    }
    return !!user?.token;
  }
}
