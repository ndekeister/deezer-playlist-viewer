import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  AlertDialogComponent,
  AlertDialogData
} from './alert-dialog.component';
import {
  MAT_DIALOG_DATA,
  MatButtonModule,
  MatDialogModule
} from '@angular/material';
import { By } from '@angular/platform-browser';

describe('AlertDialogComponent', () => {
  let component: AlertDialogComponent;
  let fixture: ComponentFixture<AlertDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertDialogComponent],
      imports: [MatButtonModule, MatDialogModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    }).compileComponents();
  }));

  describe('with input data', () => {
    const data: AlertDialogData = {
      content: 'test',
      title: 'test'
    };
    beforeEach(() => {
      TestBed.overrideProvider(MAT_DIALOG_DATA, {
        useValue: data
      });
      fixture = TestBed.createComponent(AlertDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have injected data', () => {
      expect(component.data).toEqual(data);
    });

    it('should have title displayed in template', () => {
      const element = fixture.debugElement.query(By.css('h2.mat-dialog-title'));
      expect(element).toBeTruthy();
      expect(element.nativeElement.textContent).toEqual(data.title);
    });
  });

  describe('with no title in input data', () => {
    const data: AlertDialogData = {
      content: 'test'
    };
    TestBed.overrideProvider(MAT_DIALOG_DATA, {
      useValue: data
    });
    beforeEach(() => {
      fixture = TestBed.createComponent(AlertDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have title not displayed in template', () => {
      const element = fixture.debugElement.query(By.css('h2.mat-dialog-title'));
      expect(element).toBeFalsy();
    });
  });
});
