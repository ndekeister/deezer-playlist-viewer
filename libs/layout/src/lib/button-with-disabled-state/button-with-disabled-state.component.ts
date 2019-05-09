import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'layout-button-with-disabled-state',
  templateUrl: './button-with-disabled-state.component.html',
  styleUrls: ['./button-with-disabled-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonWithDisabledStateComponent {
    /**
     * Optional, the name of the icon to display when button is disabled
     */
  @Input() disabledIconName = 'info';

    /**
     * The tooltip message to display when button is disabled
     */
  @Input() disabledTooltipMessage: string;

    /**
     * True if the button is disabled
     */
  @Input() isDisabled: boolean;

  constructor() {}
}
