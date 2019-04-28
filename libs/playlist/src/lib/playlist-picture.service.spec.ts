import { TestBed } from '@angular/core/testing';

import { PlaylistPictureService } from './playlist-picture.service';

describe('PlaylistPictureService', () => {
  let service: PlaylistPictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaylistPictureService]
    });
    service = TestBed.get(PlaylistPictureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test getPropertyToUse', () => {
    it('should return picture_xl', () => {
      expect(service.getPropertyToUse(2000, 3)).toBe('picture_xl');
    });
    it('should return picture_big', () => {
      expect(service.getPropertyToUse(1500, 3)).toBe('picture_big');
    });
    it('should return picture_medium', () => {
      expect(service.getPropertyToUse(750, 3)).toBe('picture_medium');
    });
    it('should return picture', () => {
      expect(service.getPropertyToUse(360, 3)).toBe('picture');
    });
    it('should return picture_small', () => {
      expect(service.getPropertyToUse(168, 3)).toBe('picture_small');
    });
  });
});
