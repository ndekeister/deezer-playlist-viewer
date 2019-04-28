import 'jest-preset-angular';
import { async, TestBed } from '@angular/core/testing';
import { PlaylistModule } from '@playlist/lib/playlist.module';

describe('PlaylistModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PlaylistModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PlaylistModule).toBeDefined();
  });
});
