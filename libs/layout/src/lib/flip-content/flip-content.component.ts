import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'layout-flip-content',
  templateUrl: './flip-content.component.html',
  styleUrls: ['./flip-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlipContentComponent {
  /**
   * The transition animation duration
   */
  @Input() transitionDuration = 0.8;

  constructor() {}
}
