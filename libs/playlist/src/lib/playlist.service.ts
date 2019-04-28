import { Injectable } from '@angular/core';
import { ApiService } from '@api/lib/api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PlaylistFull } from '@playlist/lib/models/playlist-full.model';
import { PlaylistTrack } from '@playlist/lib/models/playlist-track.model';

@Injectable()
export class PlaylistService {
  constructor(private apiService: ApiService) {}

  getPlaylist(playlistId: number): Observable<PlaylistFull> {
    return this.apiService.get(`/playlist/${playlistId}`).pipe(
      map(
        (result): PlaylistFull => {
          // If we have 'id' property, we receive a valid user object from deezer api
          if (result.id) {
            return {
              author: result.creator.name,
              duration: result.duration,
              id: result.id,
              nbFans: result.fans,
              nbTracks: result.nb_tracks,
              picture: result.picture,
              picture_small: result.picture_small,
              picture_medium: result.picture_medium,
              picture_big: result.picture_big,
              picture_xl: result.picture_xl,
              tracks: result.tracks.data.map(this.extractTrackInformation),
              title: result.title
            };
          } else {
            // Otherwise we don't receive a playlist object, throw a default error
            throw new Error('No data found for this playlist ID');
          }
        }
      )
    );
  }

  extractTrackInformation(trackFromApi: any): PlaylistTrack {
    return {
      artistName: trackFromApi.artist.name,
      duration: trackFromApi.duration,
      id: trackFromApi.id,
      preview: trackFromApi.preview,
      title: trackFromApi.title
    };
  }
}
