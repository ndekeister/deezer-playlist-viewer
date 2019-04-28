import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SelectUserComponent } from './select-user/select-user.component';
import { ExplorePlaylistsComponent } from './explore-playlists/explore-playlists.component';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule, routes } from './app.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppModule', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [
        AppComponent,
        ExplorePlaylistsComponent,
        PlaylistDetailsComponent,
        SelectUserComponent
      ],
      providers: [Location],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  it('fakeAsync works', fakeAsync(() => {
    const promise = new Promise(resolve => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => (done = true));
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('navigate to "" redirects you to /user', fakeAsync(() => {
    const fixture = TestBed.createComponent(SelectUserComponent);
    router.navigateByUrl('');
    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('/user');
  }));

  it('navigate to user details user/:userId/', fakeAsync(() => {
    const fixture = TestBed.createComponent(ExplorePlaylistsComponent);
    router.navigateByUrl('user/1');
    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('/user/1');
  }));

  it('navigate to playlist details user/:userId/playlist/:playlistId', fakeAsync(() => {
    const fixture = TestBed.createComponent(PlaylistDetailsComponent);
    router.navigateByUrl('user/1/playlist/1');
    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('/user/1/playlist/1');
  }));

  it('navigate to bads route redirects you to /user', fakeAsync(() => {
    const fixture = TestBed.createComponent(SelectUserComponent);

    router.navigateByUrl('thisisareallybadroute');
    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('/user');

    router.navigateByUrl('user/1/toto');
    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('/user');

    router.navigateByUrl('user/1/playlist/1/toto');
    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('/user');
  }));
});
