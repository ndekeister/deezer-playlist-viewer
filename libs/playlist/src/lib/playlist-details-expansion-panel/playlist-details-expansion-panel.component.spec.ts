import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistDetailsExpansionPanelComponent } from './playlist-details-expansion-panel.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DurationPipe } from '@utils/lib/pipe/duration.pipe';
import { generateResult } from '@playlist/lib/models/playlist-full.model';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-playlist-details-expansion-panel',
  template:
    '<playlist-details-expansion-panel [playlist]="playlist"></playlist-details-expansion-panel>'
})
class TestPlaylistDetailsExpansionPanelComponent {
  playlist = generateResult();
}

describe('PlaylistDetailsExpansionPanelComponent', () => {
  let testComponent: TestPlaylistDetailsExpansionPanelComponent;
  let testFixture: ComponentFixture<TestPlaylistDetailsExpansionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DurationPipe,
        PlaylistDetailsExpansionPanelComponent,
        TestPlaylistDetailsExpansionPanelComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    testFixture = TestBed.createComponent(
      TestPlaylistDetailsExpansionPanelComponent
    );
    testComponent = testFixture.componentInstance;
    testFixture.detectChanges();
  });

  it('should display the good template', () => {
    expect(
      testFixture.debugElement.query(By.css('mat-panel-title'))
    ).toBeTruthy();
    expect(testFixture.debugElement.query(By.css('.picture'))).toBeTruthy();
    expect(
      testFixture.debugElement
        .query(By.css('.info'))
        .nativeElement.querySelectorAll('.helping-text').length
    ).toBe(4);
  });
});
