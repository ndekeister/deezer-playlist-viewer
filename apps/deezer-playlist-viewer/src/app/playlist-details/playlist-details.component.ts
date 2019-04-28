import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'deezer-playlist-viewer-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.scss']
})
export class PlaylistDetailsComponent implements OnInit {
  /**
   * PlaylistId from route
   */
  playlistId: number;

  /**
   * UserId from route
   */
  userId: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.pipe(take(1)).subscribe(async params => {
      const playlistId = +params.get('playlistId');
      const userId = +params.get('userId');
      if (
        Number.isInteger(userId) &&
        userId > 0 &&
        Number.isInteger(playlistId) &&
        playlistId > 0
      ) {
        this.userId = userId;
        this.playlistId = playlistId;
      } else {
        await this.router.navigateByUrl('/');
      }
    });
  }

  getToolbarTitle(): string {
    return 'Exploring playlist tracks';
  }
}
