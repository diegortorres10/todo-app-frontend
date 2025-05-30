import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // TODO: Considerar exponer un MaterialAngularModule en shared con los modules comunes
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toast = inject(ToastrService);

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public userEmail: string
  ) {}

  // Signals
  isLoading = signal(false);

  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: [''],
  });

  ngOnInit(): void {
    if (!this.userEmail) {
      // Siguiendo el flujo planteado el correo debería ya venir desde el componente de login
      this.toast.error('Hubo un error al recuperar el correo');
      this.dialogRef.close(false);
    }

    this.registerForm.patchValue({
      email: this.userEmail,
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;

    this.isLoading.set(true);

    const registerData = {
      email: this.registerForm.value.email,
      name: this.registerForm.value.name || undefined,
    };

    this.authService.register(registerData).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          this.dialogRef.close(true);
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        this.toast.error(error.error?.message || 'Error al crear la cuenta');
      },
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
