import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/Auth/AuthResponse.interface';
import { RegisterRequest } from '../interfaces/Auth/RegisterRequest.interface';

export abstract class AuthRepository {
  abstract login(email: string): Observable<AuthResponse>;
  abstract register(request: RegisterRequest): Observable<AuthResponse>;
}
