import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import HistoryRouter from '../../../../hocs/history-route/history-route';
import { makeFakeFilm, makeFakeReview } from '../../../../utils/mocks';
import { AuthorizationStatus } from '../../../../const';
import MyListBtn from './my-list-btn';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockFilm = makeFakeFilm();
const mockFilms = [makeFakeFilm(), makeFakeFilm()];
const mockReviews = [makeFakeReview(), makeFakeReview()];

const store = {
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  FILMS_DATA: {
    films: {
      data: mockFilms,
      filteredData: mockFilms,
      isLoading: false,
    },
    favoriteFilms: {
      data: mockFilms,
      isLoading: false,
      isUpdating: false,
    },
    similarFilms: {
      data: mockFilms.slice(0, 4),
      isLoading: false,
    },
    film: {
      data: mockFilm,
      isLoading: false,
    },
    promoFilm: {
      data: mockFilm,
      isLoading: false,
    }
  },
  REVIEWS_DATA: {
    reviews: mockReviews,
    isReviewsLoading: false,
    isReviewPosting: false,
  },
  FILM_LIST: {activeGenre: 'All', renderedFilmsQuantity: 8},
};

const authStore = mockStore({
  ...store,
  USER: {authorizationStatus: AuthorizationStatus.Auth},
});

const notAuthStore = mockStore({
  ...store,
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
});

describe('Component: MyListButton', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={authStore}>
        <HistoryRouter history={history}>
          <MyListBtn filmId={0} />
        </HistoryRouter>
      </Provider>,
    );

    const button = screen.getByText(/My list/i);

    expect(button).toBeInTheDocument();
  });

  it('should navigate to login when user is not authorized', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={notAuthStore}>
        <HistoryRouter history={history}>
          <MyListBtn filmId={0} />
        </HistoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(/My list/i));

    expect(history.location.pathname).toBe('/login');
  });

  it('should render loading text when favorite films data is loading', () => {
    const storeWithLoadingData = mockStore({
      ...store,
      FILMS_DATA: {
        ...store.FILMS_DATA,
        favoriteFilms: {
          ...store.FILMS_DATA.favoriteFilms,
          isLoading: true,
        }
      }
    });

    const history = createMemoryHistory();

    render(
      <Provider store={storeWithLoadingData}>
        <HistoryRouter history={history}>
          <MyListBtn filmId={0} />
        </HistoryRouter>
      </Provider>
    );

    const element = screen.getByText(/Loading.../i);

    expect(element).toBeInTheDocument();
  });

  it('should update favorite films count when favorite films are updated', async () => {
    const history = createMemoryHistory();

    render(
      <Provider store={authStore}>
        <HistoryRouter history={history}>
          <MyListBtn filmId={0} />
        </HistoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(/My list/i));

    await screen.findByText(/2/i);

    expect(screen.getByText(/2/)).toBeInTheDocument();
  });

});
