import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistTracksCardComponent } from './playlist-tracks-card.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { generateResult } from '@playlist/lib/models/playlist-track.model';
import {
  MatSnackBar,
  MatSnackBarModule,
  MatTableModule
} from '@angular/material';
import { DurationPipe } from '@utils/lib/pipe/duration.pipe';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-playlist-tracks-card',
  template: '<playlist-tracks-card [tracks]="tracks"></playlist-tracks-card>'
})
class TestPlaylistTracksCardComponent {
  tracks = [];
}

describe('PlaylistTracksCardComponent', () => {
  let component: PlaylistTracksCardComponent;
  let matSnackBar: MatSnackBar;
  let testComponent: TestPlaylistTracksCardComponent;
  let testFixture: ComponentFixture<TestPlaylistTracksCardComponent>;

  // Dirty, but only way i found to "handle" "Not implemented: HTMLMediaElement.prototype.xxx" error in Jest
  global['window'].HTMLMediaElement.prototype.load = () => {};
  global['window'].HTMLMediaElement.prototype.pause = () => {};
  global['window'].HTMLMediaElement.prototype.play = () => {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DurationPipe,
        PlaylistTracksCardComponent,
        TestPlaylistTracksCardComponent
      ],
      imports: [MatSnackBarModule, MatTableModule],
      providers: [MatSnackBar],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    testFixture = TestBed.createComponent(TestPlaylistTracksCardComponent);
    testComponent = testFixture.componentInstance;
    testFixture.detectChanges();

    component = testFixture.debugElement.children[0].componentInstance;
    matSnackBar = TestBed.get(MatSnackBar);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 4 columns by default', () => {
    expect(component.displayedColumns.length).toEqual(4);
  });

  it('should update matTable filter', () => {
    testComponent.tracks = new Array(2).map(generateResult);
    component.applyFilter('test');
    expect(component.dataSource.filter).toBe('test');
  });

  it('should track by trackId', () => {
    const track = generateResult();
    expect(component.trackByFn(track)).toEqual(track.id);
  });

  it('should test if track match filter', () => {
    const track = generateResult();
    track.title = 'test';
    expect(component.isTrackMatchingFilter(track, 'test')).toBeTruthy();

    track.title = 'toto';
    track.artistName = 'toto';
    expect(component.isTrackMatchingFilter(track, 'test')).toBeFalsy();
  });

  it('should call isTrackMatchingFilter when calling matTable filterPredicate', () => {
    const spy = spyOn(component, 'isTrackMatchingFilter');
    component.dataSource.filterPredicate(generateResult(), 'test');
    expect(spy).toHaveBeenCalled();
  });

  // Probably need to be refactored, i face issues testing Audio / HTMLMediaElement
  describe('test audio preview', () => {
    describe('test isPreviewActive', () => {
      it('should test if preview is active when no preview filled', () => {
        expect(component.isPreviewActive('test')).toBeFalsy();
      });
    });

    describe('test togglePreview', () => {
      it('should call playPreview if track src is not enabled', () => {
        const audioLoadSpy = spyOn(component.preview, 'load');
        const audioPauseSpy = spyOn(component.preview, 'pause');

        const track = generateResult();
        component.togglePreview(track.preview);

        expect(audioPauseSpy).toHaveBeenCalled();
        expect(component.preview.src).toBe(track.preview);
        expect(audioLoadSpy).toHaveBeenCalled();
      });

      it('should call playPreview if track src enabled but not playing', () => {
        const playPreviewSpy = spyOn(component, 'playPreview');
        const track = generateResult();
        component.preview.src = track.preview;
        component.togglePreview(track.preview);

        expect(playPreviewSpy).toHaveBeenCalled();
      });
    });

    describe('test playPreview', () => {
      it('should call playPreview and play preview', () => {
        const audioPlaySpy = spyOn(component.preview, 'play');
        component.playPreview();
        expect(audioPlaySpy).toHaveBeenCalled();
      });

      it('should call playPreview, throw error and display a snackBar', () => {
        spyOn(component.preview, 'play').and.throwError('');
        const matSnackBarOpenSpy = spyOn(matSnackBar, 'open');

        component.playPreview();
        expect(matSnackBarOpenSpy).toHaveBeenCalled();
      });
    });
  });

  describe('should display the good template', () => {
    it('when we dont have tracks', () => {
      expect(testFixture.debugElement.query(By.css('[mat-table]'))).toBeFalsy();
      const element = testFixture.debugElement.query(By.css('mat-card'));
      expect(element).toBeTruthy();
      expect(element.nativeElement.textContent).toContain(
        "This playlist don't have any tracks yet"
      );
    });

    it('when we have tracks', () => {
      testComponent.tracks = new Array(2).fill(null).map(generateResult);

      testFixture.detectChanges();

      expect(
        testFixture.debugElement.query(By.css('mat-form-field'))
      ).toBeTruthy();
      expect(
        testFixture.debugElement.query(By.css('[mat-table]'))
      ).toBeTruthy();
      expect(
        testFixture.debugElement.query(By.css('mat-card .no-data'))
      ).toBeFalsy();
    });

    it('when we have tracks but none matching filter', () => {
      const track = generateResult();
      track.artistName = 'test';
      track.title = 'test';

      component.applyFilter('toto');

      testComponent.tracks = [track];

      testFixture.detectChanges();

      expect(
        testFixture.debugElement.query(By.css('mat-form-field'))
      ).toBeTruthy();
      expect(
        testFixture.debugElement.query(By.css('[mat-table]'))
      ).toBeTruthy();
      expect(
        testFixture.debugElement.queryAll(By.css('[mat-table] .mat-row')).length
      ).toBe(0);
      expect(
        testFixture.debugElement.query(By.css('mat-card .no-data'))
      ).toBeTruthy();
    });
  });
});
