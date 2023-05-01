import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import FavoriteFilmList from './favorite-film-list';
import { AuthorizationStatus } from '../../../const';
import { makeFakeFilm, makeFakeReview } from '../../../utils/mocks';
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

describe('FavoriteFilmList', () => {
  it('should render FilmCard components for each film', () => {
    render(
      <Provider store={mockStore({...store})}>
        <BrowserRouter>
          <FavoriteFilmList />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getAllByRole('article')).toHaveLength(mockFilms.length);
  });

  it('should render LoadingScreen if films are still loading', () => {
    const newStore = mockStore({
      ...store,
      FILMS_DATA: {
        ...store.FILMS_DATA,
        favoriteFilms: {
          ...store.FILMS_DATA.favoriteFilms,
          isLoading: true,
        },
      },
    });

    render(
      <Provider store={newStore}>
        <BrowserRouter>
          <FavoriteFilmList />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });
});
