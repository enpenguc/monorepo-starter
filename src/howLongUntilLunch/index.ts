import ms from 'ms';
import lunchtime from './lunchtime';
import millisecondsUntil from './millisecondsUntil';

export default function howLongUntilLunch(hours: number, minutes: number) {
  // lunch is at 12.30
  if (hours === undefined) hours = 12;
  if (minutes === undefined) minutes = 30;

  const millisecondsUntilLunchTime = millisecondsUntil(lunchtime(hours, minutes));
  return ms(millisecondsUntilLunchTime, { long: true });
}
