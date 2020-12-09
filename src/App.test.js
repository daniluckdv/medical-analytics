import { render, screen } from '@testing-library/react';
import { timer } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import App from './App';
import { DataProvider } from './providers/data.provider';

test('observable data subscription', (done) => {
  const timer$ = timer(4000);
  const { data$ } = new DataProvider();

  data$
    .pipe(
      takeUntil(timer$),
      finalize(() => done()),
    )
    .subscribe();
});

test('check values on empty', () => {
  render(<App />);

  const temperatureValue = screen.getByTestId('temperatureValue');
  const airPressureValue = screen.getByTestId('airPressureValue');
  const humidityValue = screen.getByTestId('humidityValue');

  expect(temperatureValue).toHaveTextContent('N/A');
  expect(airPressureValue).toHaveTextContent('N/A');
  expect(humidityValue).toHaveTextContent('N/A');
});
