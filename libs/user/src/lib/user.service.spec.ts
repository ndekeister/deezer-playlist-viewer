import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { ApiServiceMock } from '@api/testing/api.service.mock';
import { ApiService } from '@api/lib/api.service';
import { of } from 'rxjs';
import * as UserModel from '@user/lib/models/user.model';
import * as UserPlaylistInfoModel from '@user/lib/models/user-playlist-info.model';
import * as PlaylistBasicModel from '@playlist/lib/models/playlist-basic.model';

describe('UserService', () => {
  let apiService: ApiServiceMock;
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        {
          provide: ApiService,
          useClass: ApiServiceMock
        }
      ]
    });
    apiService = TestBed.get(ApiService);
    service = TestBed.get(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test get', () => {
    it('should return a User', () => {
      const id = 1;
      const user = UserModel.generateResult(id);

      spyOn(apiService, 'get').and.returnValue(of(user));

      service.get(id).subscribe(result => {
        expect(result).toBe(user);
        expect(result.id).toBe(id);
      });
    });

    it('should return a User from cache', () => {
      const id = 1;
      const user = UserModel.generateResult(id);

      spyOn(apiService, 'get').and.returnValue(of(user));

      service.get(id).subscribe(result => {
        expect(result).toBe(user);
        expect(result.id).toBe(id);
      });

      service.get(id, true).subscribe(result => {
        expect(result).toBe(user);
      });
    });

    it('should throw an error if we dont have id property', () => {
      const id = 1;

      spyOn(apiService, 'get').and.returnValue(of({}));

      service.get(id).subscribe(
        result => {
          expect(result).not.toBeDefined();
        },
        error => {
          expect(error).toBeDefined();
        }
      );
    });
  });

  describe('test getPlaylistsInfo', () => {
    it('should return a UserPlaylistInfo', () => {
      const userPlayListInfo = UserPlaylistInfoModel.generateResult();

      spyOn(apiService, 'get').and.returnValue(of(userPlayListInfo));

      service.getPlaylistsInfo(1).subscribe(result => {
        expect(result).toBe(userPlayListInfo);
      });
    });
  });

  describe('test getPlaylistsAtIndex', () => {
    it('should return a PlaylistBasic[]', () => {
      const playlistListBasic = [PlaylistBasicModel.generateResult()];

      spyOn(apiService, 'get').and.returnValue(of(playlistListBasic));

      service.getPlaylistsAtIndex(1, 10).subscribe(result => {
        expect(result).toBe(playlistListBasic);
      });
    });
  });
});
