import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return error message if not a number', () => {
    expect(pipe.transform(<any>'test')).toBe('Bad duration');
  });

  it('should return 02:00:00', () => {
    expect(pipe.transform(7200)).toBe('02:00:00');
  });

  it('should return 00:02:00', () => {
    expect(pipe.transform(120)).toBe('00:02:00');
  });

  it('should return 00:00:02', () => {
    expect(pipe.transform(2)).toBe('00:00:02');
  });

  it('should prepend a 0 if number < 10', () => {
    expect(pipe.minTwoDigits(9)).toBe('09');
  });

  it('should not prepend a 0 if number >= 10', () => {
    expect(pipe.minTwoDigits(11)).toBe('11');
  });
});
