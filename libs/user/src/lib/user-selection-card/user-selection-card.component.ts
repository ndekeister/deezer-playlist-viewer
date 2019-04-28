import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import {
  AlertDialogComponent,
  AlertDialogData
} from '@dialogs/lib/alert-dialog/alert-dialog.component';
import { UserService } from '@user/lib/user.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'user-selection-card',
  templateUrl: './user-selection-card.component.html',
  styleUrls: ['./user-selection-card.component.scss']
})
export class UserSelectionCardComponent {
  /**
   * Set to true when we retrieve user data from deezer API
   */
  isLoading = false;

  /**
   * UserId filled by the user
   */
  userId: number;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {}

  exploreUser(): void {
    this.isLoading = true;
    // We try to get data for specified userId
    this.userService
      .get(this.userId)
      .pipe(take(1))
      .subscribe(
        async result => {
          // We found a valid user, we navigate to playlist route
          await this.router.navigateByUrl(`user/${result.id}`);
        },
        (error: Error) => {
          // Otherwise display alert dialog as selected userId don't exist or may not have valid data
          const alertDialogData: AlertDialogData = {
            content: error.message
          };
          const dialogRef = this.dialog.open(AlertDialogComponent, {
            data: alertDialogData
          });
          dialogRef.afterClosed().subscribe(() => {
            // Once dialog is closed, reset userId
            this.resetUserId();
            this.isLoading = false;
          });
        }
      );
  }

  resetUserId(): void {
    this.userId = null;
  }
}
