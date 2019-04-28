import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '@user/lib/models/user.model';

@Component({
  selector: 'deezer-playlist-viewer-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  /**
   * Backpath
   */
  @Input() backPath: string;
  /**
   * The toolbar title
   */
  @Input() title: string;

  /**
   * User instance
   */
  @Input() user: User;

  constructor() {}
}
