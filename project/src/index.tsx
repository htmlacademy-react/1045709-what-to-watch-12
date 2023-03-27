import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { films } from './mocks/films';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App films = {films} headerFilm = {{title: 'The Grand Budapest Hotel', genre: 'Drama', year: 2014}} />
    </Provider>
  </React.StrictMode>
);
