import { Component, Input, OnInit } from '@angular/core';
import { PlaylistFull } from '@playlist/lib/models/playlist-full.model';
import { PlaylistService } from '@playlist/lib/playlist.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.scss']
})
export class PlaylistDetailsComponent implements OnInit {
  /**
   * The playlistId
   */
  @Input() playlistId: number;

  /**
   * True if loading playlist data fail
   */
  isError: boolean;

  /**
   * True if we are loading playlist data
   */
  isLoading: boolean;

  /**
   * The playlist with full information
   */
  playlist: PlaylistFull;

  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {
    this.isError = false;
    this.isLoading = true;
    this.playlistService
      .getPlaylist(this.playlistId)
      .pipe(take(1))
      .subscribe(
        playlist => {
          this.playlist = playlist;
          this.isLoading = false;
        },
        () => {
          this.isError = true;
          this.isLoading = false;
        }
      );
  }
}
