import { inject, Injectable } from '@angular/core';
import { AuthImplService } from '../implementations/auth-impl.service';
import { AuthResponse } from '../interfaces/Auth/AuthResponse.interface';
import { RegisterRequest } from '../interfaces/Auth/RegisterRequest.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthUseCase {
  private authImplService = inject(AuthImplService);

  login(email: string): Observable<AuthResponse> {
    return this.authImplService.login(email).pipe(map((response) => response));
  }

  register(registerRequest: RegisterRequest): Observable<AuthResponse> {
    return this.authImplService
      .register(registerRequest)
      .pipe(map((response) => response));
  }
}
