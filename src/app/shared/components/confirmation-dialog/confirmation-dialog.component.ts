import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmationDialogConfig {
  title?: string;
  message: string;
  icon?: string;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonText?: string;
  waitToConfirm?: number;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogConfig
  ) {
    // Por defecto
    this.data = {
      title: data.title || 'Confirmación',
      message: data.message,
      icon: data.icon || 'help',
      confirmButtonText: data.confirmButtonText || 'Sí',
      confirmButtonColor: data.confirmButtonColor || 'primary',
      cancelButtonText: data.cancelButtonText || 'Cancelar',
      waitToConfirm: data.waitToConfirm || 0,
    };
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
