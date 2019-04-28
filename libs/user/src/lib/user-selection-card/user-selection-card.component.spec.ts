import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectionCardComponent } from './user-selection-card.component';
import { UserService } from '@user/lib/user.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule, MatInputModule } from '@angular/material';
import { UserServiceMock } from '@user/testing/user.service.mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { throwError } from 'rxjs';
import { MatDialogStub } from '../../../../../testing/stub/mat-dialog-stub';
import { By } from '@angular/platform-browser';

describe('UserSelectionCardComponent', () => {
  let component: UserSelectionCardComponent;
  let dialog: MatDialog;
  let fixture: ComponentFixture<UserSelectionCardComponent>;
  let router: Router;
  let userService: UserServiceMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserSelectionCardComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatDialogModule,
        MatInputModule
      ],
      providers: [
        {
          provide: UserService,
          useClass: UserServiceMock
        },
        {
          provide: Router,
          useValue: {
            navigateByUrl: () => Promise.resolve()
          }
        },
        {
          provide: MatDialog,
          useClass: MatDialogStub
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    dialog = TestBed.get(MatDialog);
    router = TestBed.get(Router);
    userService = TestBed.get(UserService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSelectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should try to get an user and navigate to user route if user is found', () => {
    const routerNavigateByUrlSpy = spyOn(router, 'navigateByUrl');
    const userServiceGetSpy = spyOn(userService, 'get').and.callThrough();

    component.exploreUser();

    expect(userServiceGetSpy).toHaveBeenCalled();
    expect(routerNavigateByUrlSpy).toHaveBeenCalled();
  });

  it('should try to get an user but fail and display a dialog', () => {
    const dialogOpenSpy = spyOn(dialog, 'open').and.callThrough();
    const userServiceGetSpy = spyOn(userService, 'get').and.callFake(() =>
      throwError('')
    );

    component.exploreUser();

    expect(userServiceGetSpy).toHaveBeenCalled();
    expect(dialogOpenSpy).toHaveBeenCalled();
  });

  it('should reset userId', () => {
    component.userId = 1;
    component.resetUserId();
    expect(component.userId).toBeNull();
  });

  describe('test template', () => {
    it('should display the good template when not loading or error', () => {
      expect(
        fixture.debugElement.query(By.css('mat-card form mat-form-field input'))
      ).toBeTruthy();
      expect(
        fixture.debugElement.query(
          By.css('mat-card form mat-form-field button')
        )
      ).toBeTruthy();
      expect(
        fixture.debugElement.query(By.css('mat-card .explore-container button'))
      ).toBeTruthy();
    });

    it('should display the good template when loading', () => {
      component.isLoading = true;

      fixture.detectChanges();

      expect(
        fixture.debugElement.query(By.css('mat-card .explore-container button'))
      ).toBeFalsy();
      expect(
        fixture.debugElement.query(
          By.css('mat-card .explore-container mat-spinner')
        )
      ).toBeTruthy();
    });
  });
});
