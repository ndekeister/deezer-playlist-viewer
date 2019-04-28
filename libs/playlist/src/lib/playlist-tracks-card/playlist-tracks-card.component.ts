import {
  AfterViewChecked,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { PlaylistTrack } from '@playlist/lib/models/playlist-track.model';
import { MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'playlist-tracks-card',
  templateUrl: './playlist-tracks-card.component.html',
  styleUrls: ['./playlist-tracks-card.component.scss']
})
export class PlaylistTracksCardComponent
  implements OnInit, AfterViewChecked, OnDestroy, OnChanges {
  /**
   * The list of tracks
   */
  @Input() tracks: PlaylistTrack[] = [];

  @ViewChild(MatSort) sort: MatSort;

  /**
   * Datasource containing the list of tracks
   */
  dataSource: MatTableDataSource<PlaylistTrack> = new MatTableDataSource();

  /**
   * Columns to display in mat table
   */
  displayedColumns: string[] = ['preview', 'title', 'duration', 'artistName'];

  /**
   * Used to handle preview of track
   */
  preview = new Audio();

  constructor(private snackBar: MatSnackBar) {
    this.dataSource.filterPredicate = (data: PlaylistTrack, filter: string) =>
      this.isTrackMatchingFilter(data, filter);
  }

  ngOnInit() {
    this.dataSource.data = this.tracks;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tracks && changes.tracks.currentValue) {
      this.dataSource.data = changes.tracks.currentValue;
    }
  }

  ngAfterViewChecked() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isPreviewActive(src: string): boolean {
    return (
      this.preview.src === src && !this.preview.paused && !this.preview.ended
    );
  }

  isTrackMatchingFilter(track: PlaylistTrack, filter: string): boolean {
    return (
      !filter ||
      track.artistName.includes(filter) ||
      track.title.includes(filter)
    );
  }

  async togglePreview(src: string): Promise<void> {
    if (this.preview.src === src) {
      if (this.preview.paused) {
        await this.playPreview();
      } else {
        this.preview.pause();
      }
    } else {
      this.preview.pause();
      this.preview.src = src;
      this.preview.load();
      await this.playPreview();
    }
  }

  async playPreview(): Promise<void> {
    try {
      await this.preview.play();
    } catch (e) {
      this.snackBar.open('Failed to load track preview', 'Ok', {
        duration: 2000
      });
      this.preview.src = '';
    }
  }

  trackByFn(track: PlaylistTrack): number {
    return track.id;
  }

  ngOnDestroy() {
    this.preview.pause();
  }
}
