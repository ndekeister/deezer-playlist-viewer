import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistPictureService } from '@playlist/lib/playlist-picture.service';
import { PlaylistService } from '@playlist/lib/playlist.service';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';
import { LayoutModule } from '@layout/lib/layout.module';
import { FlexModule } from '@angular/flex-layout';
import { PlaylistTracksCardComponent } from './playlist-tracks-card/playlist-tracks-card.component';
import { UtilsModule } from '@utils/lib/utils.module';
import { PlaylistDetailsExpansionPanelComponent } from './playlist-details-expansion-panel/playlist-details-expansion-panel.component';

@NgModule({
  declarations: [
    PlaylistDetailsComponent,
    PlaylistTracksCardComponent,
    PlaylistDetailsExpansionPanelComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    LayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    UtilsModule
  ],
  providers: [
    PlaylistService,
    PlaylistPictureService,
    {
      provide: 'windowObject',
      useValue: window
    }
  ],
  exports: [PlaylistDetailsComponent]
})
export class PlaylistModule {}
