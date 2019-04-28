import { TestBed } from '@angular/core/testing';

import { PlaylistService } from './playlist.service';
import { ApiService } from '@api/lib/api.service';
import { ApiServiceMock } from '@api/testing/api.service.mock';
import { of } from 'rxjs';
import { generateResult } from '@playlist/lib/models/playlist-full.model';
import { PlaylistTrack } from '@playlist/lib/models/playlist-track.model';

describe('PlaylistService', () => {
  let apiService: ApiServiceMock;
  let service: PlaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlaylistService,
        {
          provide: ApiService,
          useClass: ApiServiceMock
        }
      ]
    });
    apiService = TestBed.get(ApiService);
    service = TestBed.get(PlaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test getPlaylist', () => {
    it('should return a PlaylistFull', () => {
      const id = 1;
      const playlistFull = generateResult(id);

      spyOn(apiService, 'get').and.returnValue(of(playlistFull));

      service.getPlaylist(id).subscribe(result => {
        expect(result).toBe(playlistFull);
        expect(result.id).toBe(id);
      });
    });

    it('should throw an error if we dont have id property', () => {
      const id = 1;

      spyOn(apiService, 'get').and.returnValue(of({}));

      service.getPlaylist(id).subscribe(
        result => {},
        error => {
          expect(error).toBeDefined();
        }
      );
    });
  });

  describe('test extractTrackInformation', () => {
    it('should extract track info correctly', () => {
      const trackFromApi = {
        artist: {
          name: 'test'
        },
        duration: 10,
        id: 10,
        preview: 'test',
        title: 'test'
      };

      const track: PlaylistTrack = {
        artistName: trackFromApi.artist.name,
        duration: trackFromApi.duration,
        id: trackFromApi.id,
        preview: trackFromApi.preview,
        title: trackFromApi.title
      };

      expect(service.extractTrackInformation(trackFromApi)).toEqual(track);
    });
  });
});
