import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import FilmPage from './film-page';
import { AuthorizationStatus } from '../../const';
import { makeFakeFilm, makeFakeReview } from '../../utils/mocks';
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

const filmLoadingState = mockStore({
  ...store,
  FILMS_DATA: {
    film: {
      data: mockFilm,
      isLoading: true,
    },
  }
});


describe('FilmPage', () => {
  it('renders LoadingScreen when film data is loading', () => {

    render(
      <Provider store={filmLoadingState}>
        <BrowserRouter>
          <FilmPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });

  it('renders the FilmPage with film data', () => {
    render(
      <Provider store={mockStore({...store})}>
        <BrowserRouter>
          <FilmPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
  });


});
