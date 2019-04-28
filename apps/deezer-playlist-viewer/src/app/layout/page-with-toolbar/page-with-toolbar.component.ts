import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from '@user/lib/models/user.model';
import { UserService } from '@user/lib/user.service';

@Component({
  selector: 'deezer-playlist-viewer-page-with-toolbar',
  templateUrl: './page-with-toolbar.component.html',
  styleUrls: ['./page-with-toolbar.component.scss']
})
export class PageWithToolbarComponent implements OnInit {
  /**
   * Backpath
   */
  @Input() backpath: string;
  /**
   * The toolbar title
   */
  @Input() toolbarTitle: string;

  /**
   * The user id
   */
  @Input() userId: number;

  /**
   * True if loading user data failed
   */
  isError: boolean;

  /**
   * True if we are loading user data
   */
  isLoading: boolean;

  /**
   * User instance of userId from route
   */
  user: User;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.isLoading = true;
    this.userService
      .get(this.userId, true)
      .pipe(take(1))
      .subscribe(
        user => {
          this.user = user;
          this.isLoading = false;
        },
        () => {
          this.isError = true;
          this.isLoading = false;
        }
      );
  }
}
