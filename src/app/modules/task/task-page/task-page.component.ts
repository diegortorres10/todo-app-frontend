import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TaskUseCase } from '../../../core/infraestructure/usecase/task.usecase';
import { TaskResponse } from '../../../core/infraestructure/interfaces/Task/GetTaskResponse.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { User } from '../../../core/infraestructure/interfaces/Auth/AuthResponse.interface';
import { AuthService } from '../../../core/auth/auth.service';
import { EmptyDataComponent } from '../../../shared/components/empty-data/empty-data.component';
import { TaskFormComponent } from '../modals/task-form/task-form.component';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogConfig,
} from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmptyDataComponent,
    ConfirmationDialogComponent,
    // TODO: Considerar exponer un MaterialAngularModule en shared con los modules comunes
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatCheckboxModule,
    MatDividerModule,
  ],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss',
})
export class TaskPageComponent {
  isLoading = signal(false);
  isUpdating = signal(false);

  userData: User | null;

  dataSource: TaskResponse[] = [];
  displayedColumns: string[] = [
    'title',
    'description',
    'state',
    'createdAt',
    'actions',
  ];

  // TODO: conteo de tareas que venga desde api. Aplicar sort a la tabla
  private toast = inject(ToastrService);
  private taskUseCase = inject(TaskUseCase);
  private authService = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  constructor() {
    this.userData = this.authService.getUserData();
    this.getData();
  }

  /**
   * Obtenemos la data de tareas
   * @returns
   */
  getData() {
    if (!this.userData?.id) {
      return;
      // TODO: Redirect a login
    }

    this.isLoading.set(true);

    this.taskUseCase.getAllTasks().subscribe({
      next: (reponse) => {
        if (reponse.success) {
          this.dataSource = reponse.data;
          this.isLoading.set(false);
        } else {
          this.toast.error(reponse.message || 'Error al obtener tareas');
        }
      },
      error: (err: any) => {
        this.toast.error(err.error?.message || 'Error al obtener tareas');
      },
    });
  }

  /**
   * Abrir modal para crear tarea
   */
  openModalCreateTask(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      minWidth: '45%',
      maxWidth: '100vh',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Refrescamos data
        this.getData();
      }
    });
  }

  /**
   * Enviar a actualizar el estado de una tarea
   * @param taskId
   */
  onUpdateStateTask(task: TaskResponse): void {
    // TODO: realizar un isUpdating para cada fila
    this.isUpdating.set(true);
    const updatedState = !task.completed;
    this.taskUseCase.updateStateTask(task.id, updatedState).subscribe({
      next: (response) => {
        this.isUpdating.set(false);
        if (response.success) {
          this.toast.success('Estado actualizado');
          // Si es correcta la actualziación, cambiamos en el dom el check
          task.completed = updatedState;
        } else {
          this.toast.error(
            response.message || 'Error al actualizar estado de tarea'
          );
        }
      },
      error: (err: any) => {
        this.isLoading.set(false);
        this.toast.error(
          err.error?.message || 'Error al actualizar estado de tarea'
        );
      },
    });
  }

  /**
   * Abrir modal para actualizar tarea
   * @param task
   */
  openEditTask(task: TaskResponse): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      minWidth: '45%',
      maxWidth: '100vh',
      data: task,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Refrescamos data
        this.getData();
      }
    });
  }

  openDeleteTask(task: TaskResponse): void {
    const dialogconfig: ConfirmationDialogConfig = {
      title: 'Eliminar tarea',
      icon: 'delete',
      message: `¿Estás seguro de eliminar la tarea con título: ${task.title}`,
      confirmButtonText: 'Eliminar tarea',
      confirmButtonColor: 'warn',
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      minWidth: '45%',
      maxWidth: '100vh',
      data: dialogconfig,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskUseCase.deleteTask(task.id).subscribe({
          next: (reponse) => {
            if (reponse.success) {
              this.toast.success(reponse.message);
              this.getData();
            } else {
              this.toast.error(reponse.message || 'Error al eliminar tarea');
            }
          },
          error: (err: any) => {
            this.toast.error(err.error?.message || 'Error al eliminar tarea');
          },
        });
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
