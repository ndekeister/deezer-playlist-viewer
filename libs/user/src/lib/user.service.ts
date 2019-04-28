import { Injectable } from '@angular/core';
import { ApiService } from '@api/lib/api.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@user/lib/models/user.model';
import { UserPlaylistInfo } from '@user/lib/models/user-playlist-info.model';
import { PlaylistBasic } from '@playlist/lib/models/playlist-basic.model';

@Injectable()
export class UserService {
  /**
   * Map of users already queried from Deezer, used to prevent unnecessary Deezer api calls
   */
  private users: Record<number, User> = {};

  constructor(private apiService: ApiService) {}

  get(userId: number, useCache: boolean = false): Observable<User> {
    if (useCache && this.users[userId]) {
      // In case we want to use cache AND we already have data for this userId, return this data
      return of(this.users[userId]);
    } else {
      // Otherwise query Deezer to retrieve recent data for this user
      return this.apiService.get(`/user/${userId}`).pipe(
        map(result => {
          // If we have 'id' property, we receive a valid user object from deezer api
          if (result.id) {
            this.users[result.id] = {
              id: result.id,
              name: result.name,
              picture_small: result.picture_small
            };
            return this.users[result.id];
          } else {
            // Otherwise we don't receive an user object, throw a default error
            throw new Error('No valid data found for this user ID');
          }
        })
      );
    }
  }

  getPlaylistsInfo(userId: number): Observable<UserPlaylistInfo> {
    return this.apiService.get(`/user/${userId}/playlists`).pipe(
      map(result => {
        return {
          list: this.extractPlaylistData(result.data),
          total: result.total
        };
      })
    );
  }

  getPlaylistsAtIndex(
    userId: number,
    index: number
  ): Observable<PlaylistBasic[]> {
    return this.apiService.get(`/user/${userId}/playlists?index=${index}`).pipe(
      map(result => {
        return this.extractPlaylistData(result.data);
      })
    );
  }

  private extractPlaylistData(data: any): PlaylistBasic[] {
    return data.map(playlist => {
      return {
        id: playlist.id,
        title: playlist.title,
        picture: playlist.picture,
        picture_small: playlist.picture_small,
        picture_medium: playlist.picture_medium,
        picture_big: playlist.picture_big,
        picture_xl: playlist.picture_xl
      };
    });
  }
}
