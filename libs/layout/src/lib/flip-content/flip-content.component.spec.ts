import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipContentComponent } from './flip-content.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  selector: 'test-host-component',
  template:
    '<layout-flip-content [transitionDuration]="transitionDuration"></layout-flip-content>'
})
class TestHostComponent {
  transitionDuration = 4;
}

@Component({
  selector: 'test-with-no-bindings-host-component',
  template: '<layout-flip-content></layout-flip-content>'
})
class TestWithNoBindingsHostComponent {}

describe('FlipContentComponent', () => {
  let component: FlipContentComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FlipContentComponent,
        TestHostComponent,
        TestWithNoBindingsHostComponent
      ]
    }).compileComponents();
  }));

  describe('with no bindings', () => {
    let testComponent: TestWithNoBindingsHostComponent;
    let testFixture: ComponentFixture<TestWithNoBindingsHostComponent>;

    beforeEach(() => {
      testFixture = TestBed.createComponent(FlipContentComponent);
      testComponent = testFixture.componentInstance;
      testFixture.detectChanges();

      component = testFixture.debugElement.children[0].componentInstance;
    });

    it('should have some default values', () => {
      expect(component.transitionDuration).toBe(0.8);
    });
  });

  describe('with bindings', () => {
    let testComponent: TestHostComponent;
    let testFixture: ComponentFixture<TestHostComponent>;

    beforeEach(() => {
      testFixture = TestBed.createComponent(FlipContentComponent);
      testComponent = testFixture.componentInstance;
      testFixture.detectChanges();

      component = testFixture.debugElement.children[0].componentInstance;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should change flip-content-inner style in template', () => {
      const element = testFixture.debugElement.query(
        By.css('.flip-content-inner')
      );
      expect(element.nativeElement.style.transitionDuration).toEqual(
        component.transitionDuration + 's'
      );
    });
  });
});
