import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../../const';
import { makeFakeFilm, makeFakeReview } from '../../../utils/mocks';
import UserBlock from './user-block';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore();

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

describe('UserBlock', () => {

  it('should render sign in link if user is not authorized', () => {
    render(
      <Provider store={notAuthStore}>
        <BrowserRouter>
          <UserBlock />
        </BrowserRouter>
      </Provider>,
    );

    const signInLink = screen.getByRole('link', { name: 'Sign in' });
    expect(signInLink).toBeInTheDocument();
  });

  it('should render sign out link if user is authorized', () => {
    render(
      <Provider store={authStore}>
        <BrowserRouter>
          <UserBlock />
        </BrowserRouter>
      </Provider>,
    );

    const signOutLink = screen.getByRole('link', { name: 'Sign out' });
    expect(signOutLink).toBeInTheDocument();
  });


});
