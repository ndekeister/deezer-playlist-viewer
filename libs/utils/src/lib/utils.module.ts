import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationPipe } from '@utils/lib/pipe/duration.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [DurationPipe],
  exports: [DurationPipe]
})
export class UtilsModule {}
