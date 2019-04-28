import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWithToolbarComponent } from './page-with-toolbar.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserService } from '@user/lib/user.service';
import { UserServiceMock } from '@user/testing/user.service.mock';
import { throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('PageWithToolbarComponent', () => {
  let component: PageWithToolbarComponent;
  let fixture: ComponentFixture<PageWithToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageWithToolbarComponent],
      providers: [
        {
          provide: UserService,
          useClass: UserServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  describe('loading user succeed', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(PageWithToolbarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have loading to false and user filled', () => {
      expect(component.isLoading).toBeFalsy();
      expect(component.user).toBeDefined();
    });

    it('should display the good template', () => {
      expect(
        fixture.debugElement.query(By.css('deezer-playlist-viewer-toolbar'))
      ).toBeTruthy();
      expect(
        fixture.debugElement.query(
          By.css('layout-simple-loading-card-with-error-handling')
        )
      ).toBeFalsy();
    });
  });

  describe('loading user failed', () => {
    let userService: UserServiceMock;

    beforeEach(() => {
      userService = TestBed.get(UserService);
      spyOn(userService, 'get').and.returnValue(throwError(''));
      fixture = TestBed.createComponent(PageWithToolbarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have loading to false and error to true', () => {
      expect(component.isLoading).toBeFalsy();
      expect(component.isError).toBeTruthy();
    });

    it('should display the good template', () => {
      expect(
        fixture.debugElement.query(By.css('deezer-playlist-viewer-toolbar'))
      ).toBeFalsy();
      expect(
        fixture.debugElement.query(
          By.css('layout-simple-loading-card-with-error-handling')
        )
      ).toBeTruthy();
    });
  });
});
