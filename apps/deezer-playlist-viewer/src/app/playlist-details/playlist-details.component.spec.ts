import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistDetailsComponent } from './playlist-details.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub } from '../../../../../testing/stub/activated-route-stub';
import { By } from '@angular/platform-browser';

describe('PlaylistDetailsComponent', () => {
  let activatedRoute: ActivatedRouteStub;
  let component: PlaylistDetailsComponent;
  let fixture: ComponentFixture<PlaylistDetailsComponent>;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [PlaylistDetailsComponent],
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

  describe('with valid route params', () => {
    beforeEach(() => {
      activatedRoute.setParamMap({
        userId: 1,
        playlistId: 1
      });
      fixture = TestBed.createComponent(PlaylistDetailsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should display good template', () => {
      expect(
        fixture.debugElement.query(
          By.css('deezer-playlist-viewer-page-with-toolbar')
        )
      ).toBeTruthy();
      expect(
        fixture.debugElement.query(By.css('playlist-details'))
      ).toBeTruthy();
    });

    it('should return toolbar title', () => {
      expect(component.getToolbarTitle()).toBe('Exploring playlist tracks');
    });

    it('should have userId and playlistId defined', () => {
      expect(component.playlistId).toBeDefined();
      expect(component.userId).toBeDefined();
    });
  });

  describe('with invalid route params', () => {
    let router: Router;
    let routerNavigateByUrlSpy;

    beforeEach(() => {
      router = TestBed.get(Router);
      routerNavigateByUrlSpy = spyOn(router, 'navigateByUrl');
      activatedRoute.setParamMap({
        userId: 'test',
        playlistId: 'test'
      });
      fixture = TestBed.createComponent(PlaylistDetailsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should call router navigateByUrl', () => {
      expect(routerNavigateByUrlSpy).toHaveBeenCalledWith('/');
    });

    it('should display good template', () => {
      expect(
        fixture.debugElement.query(
          By.css('deezer-playlist-viewer-page-with-toolbar')
        )
      ).toBeTruthy();
      expect(
        fixture.debugElement.query(By.css('playlist-details'))
      ).toBeFalsy();
    });
  });
});
