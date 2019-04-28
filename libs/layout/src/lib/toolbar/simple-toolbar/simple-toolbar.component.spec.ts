import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleToolbarComponent } from './simple-toolbar.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule, MatTooltipModule } from '@angular/material';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-host-component',
  template:
    '<layout-simple-toolbar [backPath]="backPath" [title]="title"></layout-simple-toolbar>'
})
class TestHostComponent {
  backPath: string;
  title = 'test';
}

describe('SimpleToolbarComponent', () => {
  let component: SimpleToolbarComponent;
  let router: Router;
  let testComponent: TestHostComponent;
  let testFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleToolbarComponent, TestHostComponent],
      imports: [MatButtonModule, MatTooltipModule],
      providers: [
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

  beforeEach(() => {
    router = TestBed.get(Router);
    testFixture = TestBed.createComponent(TestHostComponent);
    testComponent = testFixture.componentInstance;
    testFixture.detectChanges();

    component = testFixture.debugElement.children[0].componentInstance;
  });

  it('should create', () => {
    expect(testComponent).toBeTruthy();
  });

  it('should not display go back button if no backPath', () => {
    expect(testFixture.debugElement.query(By.css('button'))).toBeFalsy();
  });

  it('should display go back button if backPath', () => {
    expect(testFixture.debugElement.query(By.css('button'))).toBeFalsy();
    testComponent.backPath = 'test';
    testFixture.detectChanges();
    expect(testFixture.debugElement.query(By.css('button'))).toBeTruthy();
  });

  it('should call router navigateByUrl with backPath on goBack', () => {
    const spy = spyOn(router, 'navigateByUrl');
    testComponent.backPath = 'test';
    testFixture.detectChanges();
    component.goBack();
    expect(spy).toHaveBeenCalledWith(testComponent.backPath);
  });
});
