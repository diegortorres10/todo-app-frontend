import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TaskUseCase } from '../../../../core/infraestructure/usecase/task.usecase';
import { TaskResponse } from '../../../../core/infraestructure/interfaces/Task/GetTaskResponse.interface';
import { UpsertTaskResponse } from '../../../../core/infraestructure/interfaces/Task/UpsertTaskResponse.interface';
import { CreateTaskRequest } from '../../../../core/infraestructure/interfaces/Task/CreateTask.interface';
import { UpdateTaskRequest } from '../../../../core/infraestructure/interfaces/Task/UpdateTaskRequest.interface';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // TODO: Considerar exponer un MaterialAngularModule en shared con los modules comunes
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private taskUseCase = inject(TaskUseCase);
  private authService = inject(AuthService);
  private toast = inject(ToastrService);

  // userId!: string;
  isEditMode: boolean = false;
  taskData!: TaskResponse;

  // Signals
  isLoading = signal(false);

  taskForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  constructor(
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskResponse
  ) {
    // Obtenemos el usuario para enviar al api
    // const userId = this.authService.getUserId();
    // if (!userId) {
    //   this.toast.error(
    //     'No pudimos encontrar la información de tu cuenta. Por favor cierra sesión y vuelve a intentarlo'
    //   );
    //   this.dialogRef.close(false);
    // } else {
    //   this.userId = userId;
    // }
  }

  ngOnInit(): void {
    if (this.data) {
      // Existe data, se debe actualizar
      this.isEditMode = true;
      this.taskData = this.data;
      this.taskForm.patchValue(this.taskData);
    }
  }

  onSaveForm(): void {
    if (this.taskForm.invalid) return;

    if (this.isEditMode) {
      this.updateTask();
    } else {
      this.createTask();
    }
  }

  private createTask() {
    this.isLoading.set(true);
    const request: CreateTaskRequest = {
      ...this.taskForm.value,
    };
    this.taskUseCase.createTask(request).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          this.dialogRef.close(true);
        } else {
          this.toast.error(response.message || 'Error al crear tarea');
        }
      },
      error: (err: any) => {
        this.isLoading.set(false);
        this.toast.error(err.error?.message || 'Error al crear tarea');
      },
    });
  }

  private updateTask() {
    this.isLoading.set(true);
    const request: UpdateTaskRequest = {
      ...this.taskForm.value,
      // TODO userId: this.userId,
    };
    this.taskUseCase.updateTask(this.taskData.id, request).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          this.dialogRef.close(true);
        } else {
          this.toast.error(response.message || 'Error al actualizar tarea');
        }
      },
      error: (err: any) => {
        this.isLoading.set(false);
        this.toast.error(err.error?.message || 'Error al actualizar tarea');
      },
    });
  }
}
