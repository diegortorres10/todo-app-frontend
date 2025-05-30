import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthRepository } from '../repositories/auth.repository';
import { AuthResponse } from '../interfaces/Auth/AuthResponse.interface';
import { RegisterRequest } from '../interfaces/Auth/RegisterRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthImplService extends AuthRepository {
  private readonly apiUrl = environment.apiUrl;
  http = inject(HttpClient);

  login(email: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/api/v1/users/login`, {
        email
      }
    );
  }

  register(registerRequest: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/api/v1/users`,
      registerRequest
    );
  }

  validateToken(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/api/auth/validate`);
  }
}
