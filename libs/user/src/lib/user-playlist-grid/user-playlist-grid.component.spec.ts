import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import { UserPlaylistGridComponent } from './user-playlist-grid.component';
import { UserService } from '@user/lib/user.service';
import { UserServiceMock } from '@user/testing/user.service.mock';
import { Router } from '@angular/router';
import { PlaylistPictureService } from '@playlist/lib/playlist-picture.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatGridListModule } from '@angular/material';
import { of, throwError } from 'rxjs';
import { generateResult } from '@playlist/lib/models/playlist-basic.model';
import { By } from '@angular/platform-browser';

describe('UserPlaylistGridComponent', () => {
  let component: UserPlaylistGridComponent;
  let fixture: ComponentFixture<UserPlaylistGridComponent>;
  let playlistPictureService: PlaylistPictureService;
  let router: Router;
  let userService: UserServiceMock;
  let windowObject;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserPlaylistGridComponent],
      imports: [InfiniteScrollModule, MatGridListModule],
      providers: [
        {
          provide: 'windowObject',
          useValue: window
        },
        {
          provide: PlaylistPictureService,
          useValue: {
            getPropertyToUse: () => ''
          }
        },
        {
          provide: UserService,
          useClass: UserServiceMock
        },
        {
          provide: Router,
          useValue: {
            navigateByUrl: () => Promise.resolve()
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    playlistPictureService = TestBed.get(PlaylistPictureService);
    router = TestBed.get(Router);
    userService = TestBed.get(UserService);
    windowObject = TestBed.get('windowObject');

    spyOn(playlistPictureService, 'getPropertyToUse');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPlaylistGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updatePlaylistPictureProperty on window resize', fakeAsync(() => {
    const spy = spyOn(component, 'updatePlaylistPictureProperty');
    window.dispatchEvent(new Event('resize'));

    tick(1000);

    expect(spy).toHaveBeenCalled();
  }));

  it('should call router navigateByUrl', async () => {
    const playlistId = 1;
    const spy = spyOn(router, 'navigateByUrl');

    await component.goToPath(playlistId);

    expect(spy).toHaveBeenCalledWith(component.playlistDetailPath + playlistId);
  });

  it('should handle error in loadUserPlaylistInfo', () => {
    spyOn(userService, 'getPlaylistsInfo').and.returnValue(throwError(of));
    component.loadUserPlaylistInfo();
    expect(component.isError.userPlaylistInfo).toBeTruthy();
    expect(component.isLoading.userPlaylistInfo).toBeFalsy();
  });

  it('should loadMorePlaylists', () => {
    const currentLength = component.userPlaylistInfo.list.length;
    const nbToLoad = 5;
    component.userPlaylistInfo.total = currentLength + nbToLoad;

    spyOn(userService, 'getPlaylistsAtIndex').and.returnValue(
      of(new Array(nbToLoad).fill(null).map(generateResult))
    );

    component.loadMorePlaylists();
    expect(component.userPlaylistInfo.list.length).toBeGreaterThan(
      currentLength
    );
  });

  it('should handle error in loadMorePlaylists', () => {
    component.userPlaylistInfo.total = 100;
    spyOn(userService, 'getPlaylistsAtIndex').and.returnValue(throwError(of));
    component.loadMorePlaylists();
    expect(component.isError.additionalPlaylists).toBeTruthy();
    expect(component.isLoading.additionalPlaylists).toBeFalsy();
  });

  describe('test template', () => {
    it('should display layout-simple-loading-card-with-error-handling if no userPlaylistInfo', () => {
      component.userPlaylistInfo = null;
      fixture.detectChanges();
      expect(
        fixture.debugElement.query(
          By.css('layout-simple-loading-card-with-error-handling')
        )
      ).toBeTruthy();
    });

    it('should display mat-card if user have no playlist', () => {
      component.userPlaylistInfo.list = [];
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.main-container'))).toBeFalsy();
      expect(
        fixture.debugElement.query(By.css('mat-card')).nativeElement.textContent
      ).toBe("This user don't have any playlist");
    });

    it('should display .main-container if user have playlists', () => {
      const nbPlaylist = 5;
      component.userPlaylistInfo.list = new Array(nbPlaylist)
        .fill(null)
        .map(generateResult);
      fixture.detectChanges();
      expect(
        fixture.debugElement.query(By.css('.main-container'))
      ).toBeTruthy();
      expect(
        fixture.nativeElement.querySelectorAll('mat-grid-tile').length
      ).toBe(nbPlaylist);
    });

    it('should display loading-additional-data div if we are loading additionalPlaylists', () => {
      component.isLoading.additionalPlaylists = true;
      fixture.detectChanges();

      const element = fixture.debugElement.query(
        By.css('.loading-additional-data')
      );
      const styles = window.getComputedStyle(element.nativeElement);
      expect(styles.visibility).toBe('visible');
    });

    it('should display loading-additional-data div if we are loading additionalPlaylists', () => {
      component.isError.additionalPlaylists = true;
      fixture.detectChanges();

      const element = fixture.debugElement.query(
        By.css('.loading-additional-data')
      );
      const styles = window.getComputedStyle(element.nativeElement);
      expect(styles.visibility).toBe('visible');
    });

    it('should not display loading-additional-data div if we are loading additionalPlaylists', () => {
      component.isError.additionalPlaylists = false;
      component.isLoading.additionalPlaylists = false;
      fixture.detectChanges();

      const element = fixture.debugElement.query(
        By.css('.loading-additional-data')
      );
      const styles = window.getComputedStyle(element.nativeElement);
      expect(styles.visibility).toBe('hidden');
    });
  });
});
