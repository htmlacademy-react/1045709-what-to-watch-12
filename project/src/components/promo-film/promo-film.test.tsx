import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { makeFakeFilm, makeFakeReview } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';
import PromoFilm from './promo-film';
import { BrowserRouter } from 'react-router-dom';

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

const promoFilmLoadedStore = mockStore({
  ...store,
  FILMS_DATA: {
    ...store.FILMS_DATA,
    promoFilm: {
      data: mockFilm,
      isLoading: false,
    }
  },
});

const promoFilmNotLoadedStore = mockStore({
  ...store,
  FILMS_DATA: {
    ...store.FILMS_DATA,
    promoFilm: {
      data: mockFilm,
      isLoading: true,
    }
  },
});

describe('PromoFilm', () => {
  it('should render correct promo film info', () => {
    render(
      <Provider store={promoFilmLoadedStore}>
        <BrowserRouter>
          <PromoFilm />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.released.toString())).toBeInTheDocument();
  });

  it('should render loading screen if promo film data is loading', () => {
    render(
      <Provider store={promoFilmNotLoadedStore}>
        <BrowserRouter>
          <PromoFilm />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });


});
