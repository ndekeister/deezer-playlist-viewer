import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSelectionCardComponent } from './user-selection-card/user-selection-card.component';
import { DialogsModule } from '@dialogs/index';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { AlertDialogComponent } from '@dialogs/lib/alert-dialog/alert-dialog.component';
import { ApiModule } from '@api/lib/api.module';
import { UserService } from '@user/lib/user.service';
import { UserPlaylistGridComponent } from './user-playlist-grid/user-playlist-grid.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LayoutModule } from '@layout/lib/layout.module';

@NgModule({
  declarations: [UserSelectionCardComponent, UserPlaylistGridComponent],
  entryComponents: [AlertDialogComponent],
  imports: [
    ApiModule,
    CommonModule,
    DialogsModule,
    FlexLayoutModule,
    FormsModule,
    InfiniteScrollModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  exports: [UserSelectionCardComponent, UserPlaylistGridComponent],
  providers: [
    UserService,
    {
      provide: 'windowObject',
      useValue: window
    }
  ]
})
export class UserModule {}
