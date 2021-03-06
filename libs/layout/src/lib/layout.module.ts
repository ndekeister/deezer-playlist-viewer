import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { SimpleToolbarComponent } from './toolbar/simple-toolbar/simple-toolbar.component';
import { FlexModule } from '@angular/flex-layout';
import { SimpleLoadingCardComponent } from './simple-loading-card/simple-loading-card.component';
import { FlipContentComponent } from './flip-content/flip-content.component';
import { SimpleLoadingCardWithErrorHandlingComponent } from './simple-loading-card-with-error-handling/simple-loading-card-with-error-handling.component';
import { ButtonWithDisabledStateComponent } from './button-with-disabled-state/button-with-disabled-state.component';

@NgModule({
  declarations: [
    SimpleToolbarComponent,
    SimpleLoadingCardComponent,
    FlipContentComponent,
    SimpleLoadingCardWithErrorHandlingComponent,
    ButtonWithDisabledStateComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  exports: [
    SimpleToolbarComponent,
    SimpleLoadingCardComponent,
    FlipContentComponent,
    SimpleLoadingCardWithErrorHandlingComponent,
    ButtonWithDisabledStateComponent
  ]
})
export class LayoutModule {}
