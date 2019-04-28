import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleLoadingCardComponent } from './simple-loading-card.component';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  selector: 'test-host-component',
  template:
    '<layout-simple-loading-card [diameter]="diameter" [text]="text"></layout-simple-loading-card>'
})
class TestHostComponent {
  diameter = 32;
  text = 'text';
}

@Component({
  selector: 'test-with-no-bindings-host-component',
  template: '<layout-simple-loading-card></layout-simple-loading-card>'
})
class TestWithNoBindingsHostComponent {}

describe('SimpleLoadingCardComponent', () => {
  let component: SimpleLoadingCardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SimpleLoadingCardComponent,
        TestHostComponent,
        TestWithNoBindingsHostComponent
      ],
      imports: [MatCardModule, MatProgressSpinnerModule]
    }).compileComponents();
  }));

  describe('with no bindings', () => {
    let testComponent: TestWithNoBindingsHostComponent;
    let testFixture: ComponentFixture<TestWithNoBindingsHostComponent>;

    beforeEach(() => {
      testFixture = TestBed.createComponent(TestWithNoBindingsHostComponent);
      testComponent = testFixture.componentInstance;
      testFixture.detectChanges();

      component = testFixture.debugElement.children[0].componentInstance;
    });

    it('should have some default values', () => {
      expect(component.diameter).toBe(32);
      expect(component.text).toBe('Loading data');
    });
  });

  describe('with bindings', () => {
    let testComponent: TestHostComponent;
    let testFixture: ComponentFixture<TestHostComponent>;

    beforeEach(() => {
      testFixture = TestBed.createComponent(TestHostComponent);
      testComponent = testFixture.componentInstance;
      testFixture.detectChanges();

      component = testFixture.debugElement.children[0].componentInstance;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display the good template', () => {
      expect(testFixture.debugElement.query(By.css('mat-card'))).toBeTruthy();
      expect(
        testFixture.debugElement.query(By.css('.loading-text'))
      ).toBeTruthy();
      expect(
        testFixture.debugElement.query(By.css('mat-spinner'))
      ).toBeTruthy();
    });
  });
});
