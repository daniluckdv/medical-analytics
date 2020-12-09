import { combineLatest, interval, of, race } from 'rxjs';
import { concatMap, delay, map } from 'rxjs/operators';

const NO_DATA_MESSAGE = 'N/A';
const RELEVANT_INTERVAL = 1000;

export class DataProvider {
  timeOut$ = of(NO_DATA_MESSAGE).pipe(delay(RELEVANT_INTERVAL));

  temperature$ = race(
    interval(this._interval).pipe(concatMap(() => of(this._value))),
    this.timeOut$,
  );
  airPressure$ = race(
    interval(this._interval).pipe(concatMap(() => of(this._value))),
    this.timeOut$,
  );
  humidity$ = race(
    interval(this._interval).pipe(concatMap(() => of(this._value))),
    this.timeOut$,
  );

  get data$() {
    return combineLatest([
      this.temperature$,
      this.airPressure$,
      this.humidity$,
    ]).pipe(
      map(([temperature, airPressure, humidity]) => ({
        temperature,
        airPressure,
        humidity,
      })),
    );
  }

  get _interval() {
    return 100 + Math.random() * 2000;
  }

  get _value() {
    return (Math.random() * 100).toFixed(0);
  }
}
