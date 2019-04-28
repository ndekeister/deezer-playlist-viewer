import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { generateResult, User } from '@user/lib/models/user.model';
import { By } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material';

@Component({
  selector: 'test-host-component',
  template:
    '<deezer-playlist-viewer-toolbar [backPath]="backPath" [title]="title" [user]="user"></deezer-playlist-viewer-toolbar>'
})
class TestHostComponent {
  backPath: string;
  title: string;
  user: User;
}

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let testComponent: TestHostComponent;
  let testFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, ToolbarComponent],
      imports: [MatTooltipModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    testFixture = TestBed.createComponent(TestHostComponent);
    testComponent = testFixture.componentInstance;
    testFixture.detectChanges();

    component = testFixture.debugElement.children[0].componentInstance;
  });

  it('should display correct image if user input is filled', () => {
    const user = generateResult();
    testComponent.user = user;
    testFixture.detectChanges();

    expect(
      testFixture.debugElement.query(By.css('img.rounded-image'))
    ).toBeTruthy();
    expect(
      testFixture.nativeElement.querySelector('img.rounded-image').src
    ).toContain(user.picture_small);
  });

  it('should not display an image if user input is not filled', () => {
    expect(
      testFixture.debugElement.query(By.css('img.rounded-image'))
    ).toBeFalsy();
  });

  it('should display a layout-simple-toolbar component', () => {
    expect(
      testFixture.debugElement.query(By.css('layout-simple-toolbar'))
    ).toBeTruthy();
  });
});
