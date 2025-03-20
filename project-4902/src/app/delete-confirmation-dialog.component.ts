import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>Confirm Deletion</h2>
      <mat-dialog-content>Are you sure you want to delete this research project?</mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-button class="green-button" (click)="onConfirm()">Delete</button>
      </mat-dialog-actions>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  styleUrls: ['./delete-confirmation-dialog.component.css'] // Linking to CSS file for styles
})
export class DeleteConfirmationDialogComponent {
  constructor(private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>) {}

  onCancel() {
    this.dialogRef.close(false); // Close dialog and return false
  }

  onConfirm() {
    this.dialogRef.close(true); // Close dialog and return true
  }
}
