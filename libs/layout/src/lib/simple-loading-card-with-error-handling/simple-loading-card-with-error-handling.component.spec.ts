import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleLoadingCardWithErrorHandlingComponent } from './simple-loading-card-with-error-handling.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-host-component',
  template:
    '<layout-simple-loading-card-with-error-handling [diameter]="diameter" [errorMessage]="errorMessage" [isError]="isError" [isLoading]="isLoading" [loadingMessage]="loadingMessage" (retryAction)="retryAction()"></layout-simple-loading-card-with-error-handling>'
})
class TestHostComponent {
  diameter = 32;
  errorMessage = 'test error message';
  isError = false;
  isLoading = true;
  loadingMessage = 'test loading message';

  retryAction() {}
}

@Component({
  selector: 'test-with-no-bindings-host-component',
  template:
    '<layout-simple-loading-card-with-error-handling></layout-simple-loading-card-with-error-handling>'
})
class TestWithNoBindingsHostComponent {}

describe('SimpleLoadingCardWithErrorHandlingComponent', () => {
  let component: SimpleLoadingCardWithErrorHandlingComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SimpleLoadingCardWithErrorHandlingComponent,
        TestHostComponent,
        TestWithNoBindingsHostComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  describe('test with no bindings', () => {
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
      expect(component.errorMessage).toBe('Failed to load data');
      expect(component.isError).toBeFalsy();
      expect(component.isLoading).toBeTruthy();
      expect(component.loadingMessage).toBe('Loading data');
    });
  });

  describe('test with bindings', () => {
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

    it('should display layout-simple-loading-card when is loading', () => {
      testComponent.isLoading = true;
      testComponent.isError = true;

      testFixture.detectChanges();

      expect(
        testFixture.debugElement.query(By.css('layout-simple-loading-card'))
      ).toBeTruthy();
      expect(testFixture.debugElement.query(By.css('mat-card'))).toBeFalsy();
    });

    it('should display error mat-card when is failed', () => {
      testComponent.isLoading = false;
      testComponent.isError = true;

      testFixture.detectChanges();

      expect(
        testFixture.debugElement.query(By.css('layout-simple-loading-card'))
      ).toBeFalsy();
      expect(testFixture.debugElement.query(By.css('mat-card'))).toBeTruthy();
    });

    it('should call emit event emitter on retry', () => {
      const spy = spyOn(testComponent, 'retryAction');
      component.retryAction.emit();
      expect(spy).toHaveBeenCalled();
    });
  });
});
