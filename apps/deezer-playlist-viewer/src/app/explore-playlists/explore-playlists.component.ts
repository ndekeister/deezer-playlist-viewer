import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'deezer-playlist-viewer-explore-playlists',
  templateUrl: './explore-playlists.component.html',
  styleUrls: ['./explore-playlists.component.scss']
})
export class ExplorePlaylistsComponent implements OnInit {
  /**
   * UserId from route
   */
  userId: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.pipe(take(1)).subscribe(async params => {
      const userId = +params.get('userId');
      if (Number.isInteger(userId) && userId > 0) {
        this.userId = userId;
      } else {
        await this.router.navigateByUrl('/');
      }
    });
  }

  getPlaylistDetailPath(): string {
    return `user/${this.userId}/playlist/`;
  }

  getToolbarTitle(): string {
    return `Exploring playlists - ID#${this.userId}`;
  }
}
