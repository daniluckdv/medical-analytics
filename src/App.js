import { useState, useEffect } from 'react';
import './App.css';
import { DataProvider } from './providers/data.provider';

const { data$ } = new DataProvider();

const useObservable = (observable) => {
  const [state, setState] = useState();

  useEffect(() => {
    const sub = observable.subscribe(setState);
    return () => sub.unsubscribe();
  }, [observable]);

  return state;
};

function App() {
  const data = useObservable(data$);

  return (
    <div className='App'>
      <div className='cards'>
        <Temperature temperature={data?.temperature} />
        <AirPressure airPressure={data?.airPressure} />
        <Humidity humidity={data?.humidity} />
      </div>
    </div>
  );
}

const Temperature = ({ temperature }) => (
  <div className='card'>
    <h2>Temperature</h2>
    <p data-testid='temperatureValue'>{temperature || 'N/A'}&#x2103;</p>
  </div>
);

const AirPressure = ({ airPressure }) => (
  <div className='card'>
    <h2>Air Pressure</h2>
    <p data-testid='airPressureValue'>{airPressure || 'N/A'}mb</p>
  </div>
);

const Humidity = ({ humidity }) => (
  <div className='card'>
    <h2>Humidity</h2>
    <p data-testid='humidityValue'>{humidity || 'N/A'}%</p>
  </div>
);

export default App;
