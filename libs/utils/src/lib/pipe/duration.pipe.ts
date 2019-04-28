import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    if (Number.isInteger(value)) {
      const SECOND = 1;
      const MINUTE = 60 * SECOND;
      const HOUR = 60 * MINUTE;

      let hours = 0;
      let minutes = 0;
      let seconds = 0;

      if (value >= HOUR) {
        hours = Math.floor(value / HOUR);
        value %= HOUR;
      }

      if (value >= MINUTE) {
        minutes = Math.floor(value / MINUTE);
        value %= MINUTE;
      }

      if (value >= SECOND) {
        seconds = value;
      }

      return `${this.minTwoDigits(hours)}:${this.minTwoDigits(
        minutes
      )}:${this.minTwoDigits(seconds)}`;
    } else {
      return 'Bad duration';
    }
  }

  minTwoDigits(n: number): string {
    return (n < 10 ? '0' : '') + n;
  }
}
