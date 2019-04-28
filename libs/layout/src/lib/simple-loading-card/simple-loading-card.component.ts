import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'layout-simple-loading-card',
  templateUrl: './simple-loading-card.component.html',
  styleUrls: ['./simple-loading-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleLoadingCardComponent {
  /**
   * The diameter of the mat spinner
   */
  @Input() diameter = 32;

  /**
   * The default loading text
   */
  @Input() text = 'Loading data';

  constructor() {}
}
