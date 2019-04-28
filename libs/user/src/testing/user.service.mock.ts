import { Observable, of } from 'rxjs';
import * as UserModel from '../lib/models/user.model';
import * as UserPlayListInfoModel from '@user/lib/models/user-playlist-info.model';
import * as PlaylistBasicModel from '@playlist/lib/models/playlist-basic.model';

export class UserServiceMock {
  get(): Observable<UserModel.User> {
    return of(UserModel.generateResult());
  }

  getPlaylistsInfo(
    userId: number
  ): Observable<UserPlayListInfoModel.UserPlaylistInfo> {
    return of(UserPlayListInfoModel.generateResult());
  }

  getPlaylistsAtIndex(
    userId: number,
    index: number
  ): Observable<PlaylistBasicModel.PlaylistBasic[]> {
    return of([PlaylistBasicModel.generateResult()]);
  }
}
