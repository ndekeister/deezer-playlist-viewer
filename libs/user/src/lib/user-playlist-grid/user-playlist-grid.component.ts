import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, take, takeUntil } from 'rxjs/operators';
import { UserService } from '@user/lib/user.service';
import { UserPlaylistInfo } from '@user/lib/models/user-playlist-info.model';
import { Router } from '@angular/router';
import { PlaylistPicture } from '@playlist/lib/models/playlist-picture.type';
import { PlaylistPictureService } from '@playlist/lib/playlist-picture.service';
import { fromEvent, Subject } from 'rxjs';

@Component({
  selector: 'user-playlist-grid',
  templateUrl: './user-playlist-grid.component.html',
  styleUrls: ['./user-playlist-grid.component.scss']
})
export class UserPlaylistGridComponent implements OnInit, OnDestroy {
  /**
   * Number of cols to display in the grid
   */
  @Input() nbCols = 3;

  /**
   * Main path for the playlist detail route
   */
  @Input() playlistDetailPath: string;

  /**
   * ID of the user
   */
  @Input() userId: number;

  /**
   * Map allowing us to handle error state for each "api" call
   */
  isError: LoadingAndErrorData = {
    additionalPlaylists: false,
    userPlaylistInfo: false
  };

  /**
   * Map allowing us to handle loading state for each "api" call
   */
  isLoading: LoadingAndErrorData = {
    additionalPlaylists: false,
    userPlaylistInfo: false
  };

  /**
   * Playlists basic information of current userId
   */
  userPlaylistInfo: UserPlaylistInfo;

  /**
   * Specify what property we need to use when displaying playlist picture
   */
  playlistPictureProperty: PlaylistPicture = 'picture';

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private playlistPictureService: PlaylistPictureService,
    private router: Router,
    private userService: UserService,
    @Inject('windowObject') private window: Window
  ) {
    fromEvent(this.window, 'resize')
      .pipe(
        debounceTime(1000),
        takeUntil(this.unsubscribe)
      )
      .subscribe(() => {
        this.updatePlaylistPictureProperty();
      });
  }

  ngOnInit() {
    this.updatePlaylistPictureProperty();
    this.loadUserPlaylistInfo();
  }

  async goToPath(playlistId: number): Promise<void> {
    await this.router.navigateByUrl(this.playlistDetailPath + playlistId);
  }

  loadUserPlaylistInfo() {
    this.isLoading.userPlaylistInfo = true;
    this.isError.userPlaylistInfo = false;
    this.userService
      .getPlaylistsInfo(this.userId)
      .pipe(take(1))
      .subscribe(
        userPlayListInfo => {
          this.userPlaylistInfo = userPlayListInfo;
          this.isLoading.userPlaylistInfo = false;
        },
        () => {
          this.isError.userPlaylistInfo = true;
          this.isLoading.userPlaylistInfo = false;
        }
      );
  }

  loadMorePlaylists(): void {
    if (this.userPlaylistInfo.list.length < this.userPlaylistInfo.total) {
      this.isError.additionalPlaylists = false;
      this.isLoading.additionalPlaylists = true;
      this.userService
        .getPlaylistsAtIndex(this.userId, this.userPlaylistInfo.list.length)
        .pipe(take(1))
        .subscribe(
          playlists => {
            this.userPlaylistInfo.list.push(...playlists);

            /*
              WARNING - Deezer API is not consistent, we may receive different number of "total" playlists for a specified user
              resulting in displaying duplicate data. In our example, for user id 5, first API call to  "https://api.deezer.com/user/5/playlists" will give us a "total" of 98 playlist, but a second call to "https://api.deezer.com/user/5/playlists?index=74" will give us a "total" of 98 playlist.

              To ensure that we are not displaying duplicate data, we need to make a verification when we do the last API call retrieving us the last playlists
           */
            if (
              this.userPlaylistInfo.list.length >= this.userPlaylistInfo.total
            ) {
              // remove duplicates
              this.userPlaylistInfo.list = this.userPlaylistInfo.list.filter(
                (playlist, index, self) => {
                  return self.findIndex(pl => pl.id === playlist.id) === index;
                }
              );
              // and update the total number of playlist with the good value
              this.userPlaylistInfo.total = this.userPlaylistInfo.list.length;
            }
            this.isLoading.additionalPlaylists = false;
          },
          () => {
            this.isError.additionalPlaylists = true;
            this.isLoading.additionalPlaylists = false;
          }
        );
    }
  }

  trackByFn(index: number): number {
    return index;
  }

  updatePlaylistPictureProperty(): void {
    this.playlistPictureProperty = this.playlistPictureService.getPropertyToUse(
      this.window.innerWidth,
      this.nbCols
    );
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

interface LoadingAndErrorData {
  additionalPlaylists: boolean;
  userPlaylistInfo: boolean;
}
