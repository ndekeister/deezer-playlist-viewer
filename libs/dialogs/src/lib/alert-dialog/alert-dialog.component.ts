import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dialogs-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertDialogData) {}
}

export interface AlertDialogData {
  content: string;
  title?: string;
}
