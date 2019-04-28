import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistDetailsComponent } from './playlist-details.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlaylistService } from '@playlist/lib/playlist.service';
import { PlaylistServiceMock } from '@playlist/testing/playlist.service.mock';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

describe('PlaylistDetailsComponent', () => {
  let component: PlaylistDetailsComponent;
  let fixture: ComponentFixture<PlaylistDetailsComponent>;
  let playlistService: PlaylistServiceMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistDetailsComponent],
      providers: [
        {
          provide: PlaylistService,
          useClass: PlaylistServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    playlistService = TestBed.get(PlaylistService);
  }));

  describe('loaded playlist', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(PlaylistDetailsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have the good template', () => {
      expect(
        fixture.debugElement.query(By.css('playlist-details-expansion-panel'))
      ).toBeTruthy();
      expect(
        fixture.debugElement.query(By.css('playlist-tracks-card'))
      ).toBeTruthy();
      expect(
        fixture.debugElement.query(
          By.css('layout-simple-loading-card-with-error-handling')
        )
      ).toBeFalsy();
    });
  });

  describe('failed to load playlist', () => {
    beforeEach(() => {
      spyOn(playlistService, 'getPlaylist').and.returnValue(throwError(of));
      fixture = TestBed.createComponent(PlaylistDetailsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have the good template', () => {
      expect(
        fixture.debugElement.query(By.css('playlist-details-expansion-panel'))
      ).toBeFalsy();
      expect(
        fixture.debugElement.query(By.css('playlist-tracks-card'))
      ).toBeFalsy();
      expect(
        fixture.debugElement.query(
          By.css('layout-simple-loading-card-with-error-handling')
        )
      ).toBeTruthy();
    });
  });
});
