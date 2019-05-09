import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonWithDisabledStateComponent } from './button-with-disabled-state.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTooltipModule } from '@angular/material';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-host-component',
  template:
    '<layout-button-with-disabled-state [isDisabled]="isDisabled" [disabledIconName]="disabledIconName" [disabledTooltipMessage]="disabledTooltipMessage"><div class="ng-content"></div></layout-button-with-disabled-state>'
})
class TestHostComponent {
  disabledIconName = 'info';
  disabledTooltipMessage = 'toto';
  isDisabled = false;
}

@Component({
  selector: 'test-with-no-bindings-host-component',
  template:
    '<layout-button-with-disabled-state><div class="ng-content"></div></layout-button-with-disabled-state>'
})
class TestWithNoBindingsHostComponent {}

describe('ButtonWithDisabledStateComponent', () => {
  let component: ButtonWithDisabledStateComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ButtonWithDisabledStateComponent,
        TestHostComponent,
        TestWithNoBindingsHostComponent
      ],
      imports: [MatTooltipModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
      expect(component.disabledIconName).toBe('info');
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

    it('should render ng-content', () => {
      testComponent.isDisabled = false;
      testFixture.detectChanges();

      expect(
        testFixture.debugElement.query(By.css('.ng-content'))
      ).toBeTruthy();
      expect(
        testFixture.debugElement.query(By.css('button[disabled]'))
      ).toBeFalsy();
    });

    it('should render the disabled button', () => {
      testComponent.isDisabled = true;
      testFixture.detectChanges();

      expect(testFixture.debugElement.query(By.css('.ng-content'))).toBeFalsy();
      expect(
        testFixture.debugElement.query(By.css('button[disabled]'))
      ).toBeTruthy();
    });

    it('should render the good icon name', () => {
      testComponent.disabledIconName = 'toto';
      testComponent.isDisabled = true;
      testFixture.detectChanges();

      expect(
        testFixture.debugElement.query(By.css('button[disabled] mat-icon'))
          .nativeElement.textContent
      ).toBe(testComponent.disabledIconName);
    });
  });
});
