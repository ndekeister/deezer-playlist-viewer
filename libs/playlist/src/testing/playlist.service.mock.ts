import { Observable, of } from 'rxjs';
import {
  generateResult,
  PlaylistFull
} from '@playlist/lib/models/playlist-full.model';

export class PlaylistServiceMock {
  getPlaylist(): Observable<PlaylistFull> {
    return of(generateResult());
  }
}
