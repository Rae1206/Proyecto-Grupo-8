import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmar-eliminacion-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmar-eliminacion-dialog.component.html',
  styleUrls: ['./confirmar-eliminacion-dialog.component.css'],
})
export class ConfirmarEliminacionDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmarEliminacionDialogComponent>) {}

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
