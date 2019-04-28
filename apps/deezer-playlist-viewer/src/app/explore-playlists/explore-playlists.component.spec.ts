import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorePlaylistsComponent } from './explore-playlists.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRouteStub } from '../../../../../testing/stub/activated-route-stub';
import { By } from '@angular/platform-browser';

describe('ExplorePlaylistsComponent', () => {
  let activatedRoute: ActivatedRouteStub;
  let component: ExplorePlaylistsComponent;
  let fixture: ComponentFixture<ExplorePlaylistsComponent>;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ExplorePlaylistsComponent],
      imports: [],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute
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
  }));

  describe('with valid userId routeParam', () => {
    beforeEach(() => {
      activatedRoute.setParamMap({
        userId: '1'
      });
      fixture = TestBed.createComponent(ExplorePlaylistsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have userId defined', () => {
      expect(component.userId).toBeDefined();
    });

    it('should return the playlist detail path', () => {
      expect(component.getPlaylistDetailPath()).toBe(
        `user/${component.userId}/playlist/`
      );
    });

    it('should return the toolbar title', () => {
      expect(component.getToolbarTitle()).toBe(
        `Exploring playlists - ID#${component.userId}`
      );
    });

    it('should display the good template', () => {
      expect(
        fixture.debugElement.query(
          By.css('deezer-playlist-viewer-page-with-toolbar')
        )
      ).toBeTruthy();
      expect(
        fixture.debugElement.query(By.css('user-playlist-grid'))
      ).toBeTruthy();
    });
  });

  describe('with invalid userId routeParams ', () => {
    let routerNavigateByUrlSpy;
    let router: Router;

    beforeEach(() => {
      activatedRoute.setParamMap({
        userId: 'test'
      });
      router = TestBed.get(Router);
      routerNavigateByUrlSpy = spyOn(router, 'navigateByUrl');

      fixture = TestBed.createComponent(ExplorePlaylistsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should redirect', () => {
      expect(routerNavigateByUrlSpy).toHaveBeenCalledWith('/');
    });

    it('should display the good template', () => {
      expect(
        fixture.debugElement.query(
          By.css('deezer-playlist-viewer-page-with-toolbar')
        )
      ).toBeTruthy();
      expect(
        fixture.debugElement.query(By.css('user-playlist-grid'))
      ).toBeFalsy();
    });
  });
});
