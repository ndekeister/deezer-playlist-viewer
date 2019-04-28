import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'layout-simple-loading-card-with-error-handling',
  templateUrl: './simple-loading-card-with-error-handling.component.html',
  styleUrls: ['./simple-loading-card-with-error-handling.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleLoadingCardWithErrorHandlingComponent {
  /**
   * The diameter of the mat spinner
   */
  @Input() diameter = 32;

  /**
   * The error message
   */
  @Input() errorMessage = 'Failed to load data';

  /**
   * True if our parent component is in error state
   */
  @Input() isError = false;

  /**
   * The loading message
   */
  @Input() loadingMessage = 'Loading data';

  /**
   * True if our parent component is in loading state
   */
  @Input() isLoading = true;

  /**
   * The function to call when user click retry
   */
  @Output() retryAction: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
}
