import { Component, Input } from '@angular/core';
import { PlaylistFull } from '@playlist/lib/models/playlist-full.model';

@Component({
  selector: 'playlist-details-expansion-panel',
  templateUrl: './playlist-details-expansion-panel.component.html',
  styleUrls: ['./playlist-details-expansion-panel.component.scss']
})
export class PlaylistDetailsExpansionPanelComponent {
  /**
   * The playlist with full information
   */
  @Input() playlist: PlaylistFull;

  constructor() {}
}
