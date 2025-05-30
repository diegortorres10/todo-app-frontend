import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignupComponent } from '../signup/signup.component';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { SystemRoutes } from '../../../core/config/route';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorResponse } from '../../../core/infraestructure/interfaces/BaseResponse/BaseResponse.interface';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SignupComponent,
    // TODO: Considerar exponer un MaterialAngularModule en shared con los modules comunes
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);

  // Signals
  isLoading = signal(false);

  // Manejo de errores de validación
  errors: ErrorResponse[] = [];

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor() {
    // Validamos si tiene sesión iniciada
    const isAuth = this.authService.checkAuthStatus();
    if (isAuth) {
      // Redirect a app
      this.router.navigateByUrl(SystemRoutes.MAIN_URLS.TASK_LIST);
    }
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;
    this.errors = [];
    this.isLoading.set(true);

    const email = this.loginForm.value.email as string;
    this.authService.login(email).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          this.router.navigateByUrl(SystemRoutes.MAIN_URLS.TASK_LIST);
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        if (error.status === 404) {
          // Usuario no encontrado, mostrar modal de registro
          this.openRegisterModal(email);
        } else {
          this.toast.error(error.error?.message || 'Error al iniciar sesión');
          // Si existen mensajes de error, presentarlos en el html
          if (error.error?.errors.length > 0) {
            this.errors = error.error?.errors;
          }
        }
      },
    });
  }

  openRegisterModal(userEmail: string): void {
    const dialogRef = this.dialog.open(SignupComponent, {
      minWidth: '45%',
      maxWidth: '100vh',
      data: userEmail,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigateByUrl(SystemRoutes.MAIN_URLS.TASK_LIST);
      }
    });
  }
}
