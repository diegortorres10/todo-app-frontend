import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { AuthUseCase } from '../infraestructure/usecase/auth.usecase';
import {
  AuthResponse,
  User,
} from '../infraestructure/interfaces/Auth/AuthResponse.interface';
import { RegisterRequest } from '../infraestructure/interfaces/Auth/RegisterRequest.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // TODO: Signals para indicar que se está validando sesión
  private authUseCase = inject(AuthUseCase);
  private localStorageService = inject(LocalStorageService);

  constructor() {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const hasValidSession = this.localStorageService.hasValidSession();
    const userData = this.localStorageService.getUserData();

    if (hasValidSession && userData) {
      this.setAuthenticationState(true, userData);
    }
  }

  login(email: string): Observable<AuthResponse> {
    return this.authUseCase.login(email).pipe(
      tap((response) => {
        if (response.success) {
          this.handleSuccessfulAuth(response);
        }
      })
    );
  }

  register(registerRequest: RegisterRequest): Observable<AuthResponse> {
    return this.authUseCase.register(registerRequest).pipe(
      tap((response) => {
        if (response.success) {
          this.handleSuccessfulAuth(response);
        }
      })
    );
  }

  private handleSuccessfulAuth(response: AuthResponse): void {
    const userData: User = {
      ...response.data,
    };
    this.localStorageService.setUserData(userData);
  }

  private setAuthenticationState(
    isAuthenticated: boolean,
    user: User | null = null
  ): void {
    // TODO: Manjar estados
  }

  getUserData(): User | null {
    const userData = this.localStorageService.getUserData();
    return userData ? userData : null;
  }

  getToken(): string | null {
    const userData = this.localStorageService.getUserData();
    return userData?.token ? userData.token : null;
  }

  getUserId(): string | null {
    const userData = this.localStorageService.getUserData();
    return userData ? userData.id : null;
  }

  checkAuthStatus(): boolean {
    return this.localStorageService.hasValidSession();
  }

  logout(): void {
    this.localStorageService.removeUserData();
  }
}
