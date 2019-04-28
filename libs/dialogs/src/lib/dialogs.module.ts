import { NgModule } from '@angular/core';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  declarations: [AlertDialogComponent],
  exports: [AlertDialogComponent]
})
export class DialogsModule {}
