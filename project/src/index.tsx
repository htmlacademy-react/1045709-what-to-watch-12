import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { ToastContainer } from 'react-toastify';
import HistoryRouter from './components/history-route/history-route';
import { store } from './store';
import { fetchFilmsAction, fetchPromoFilmAction, checkAuthAction } from './store/api-actions';
import browserHistory from './browser-history';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchFilmsAction());
store.dispatch(fetchPromoFilmAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
