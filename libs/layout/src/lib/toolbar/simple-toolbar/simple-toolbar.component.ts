import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'layout-simple-toolbar',
  templateUrl: './simple-toolbar.component.html',
  styleUrls: ['./simple-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleToolbarComponent {
  /**
   * if specified will display a back arrow routing to the backpath
   */
  @Input() backPath: string;

  /**
   * The title to display describing the current page
   */
  @Input() title: string;

  constructor(private router: Router) {}

  async goBack(): Promise<void> {
    await this.router.navigateByUrl(this.backPath);
  }
}
