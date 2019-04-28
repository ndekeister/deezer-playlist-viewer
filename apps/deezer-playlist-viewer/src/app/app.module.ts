import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from '@user/index.ts';
import { SelectUserComponent } from './select-user/select-user.component';
import { RouterModule } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';
import { ExplorePlaylistsComponent } from './explore-playlists/explore-playlists.component';
import { LayoutModule } from '@layout/index.ts';

import { environment } from '../environments/environment';
import { MatButtonModule, MatTooltipModule } from '@angular/material';
import { PlaylistModule } from '@playlist/lib/playlist.module';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { PageWithToolbarComponent } from './layout/page-with-toolbar/page-with-toolbar.component';

export const routes = [
  { path: 'user', component: SelectUserComponent },
  { path: 'user/:userId', component: ExplorePlaylistsComponent },
  {
    path: 'user/:userId/playlist/:playlistId',
    component: PlaylistDetailsComponent
  },
  { path: '**', redirectTo: 'user', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    SelectUserComponent,
    PlaylistDetailsComponent,
    ExplorePlaylistsComponent,
    ToolbarComponent,
    PageWithToolbarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FlexModule,
    LayoutModule,
    MatButtonModule,
    MatTooltipModule,
    PlaylistModule,
    UserModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      useHash: true
    })
  ],
  providers: [
    {
      provide: 'API_URL',
      useValue: environment.apiUrl
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
