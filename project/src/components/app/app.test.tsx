import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../hocs/history-route/history-route';
import { makeFakeFilm, makeFakeReview } from '../../utils/mocks';
import { AuthorizationStatus, AppRoute } from '../../const';
import App from './app';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockFilm = makeFakeFilm();
const mockFilms = [makeFakeFilm(), makeFakeFilm()];
const mockReviews = [makeFakeReview(), makeFakeReview()];

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
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
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainPage" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/2019 What to watch Ltd./i)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "FilmPage" when user navigate to "/films/:id"', () => {
    history.push(AppRoute.Film);

    render(fakeApp);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });

  it('should render "VideoPlayerPage" when user navigate to "/player/:id"', () => {
    history.push(`${AppRoute.VideoPlayer}/${4}`);

    render(fakeApp);

    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText('Transpotting')).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
