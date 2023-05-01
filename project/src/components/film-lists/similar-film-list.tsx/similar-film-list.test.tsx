import { render, screen } from '@testing-library/react';
import SimilarFilmList from './similar-film-list';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
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

describe('SimilarFilmList component', () => {

  it('should render list of similar films', () => {

    render(
      <Provider store={mockStore({...store})}>
        <BrowserRouter>
          <SimilarFilmList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getAllByRole('article')).toHaveLength(mockFilms.length);
  });

  it('should render loading screen when similar films data is loading', () => {
    const similarFilmsLoadingStore = mockStore({
      ...store,
      FILMS_DATA: {
        ...store.FILMS_DATA,
        similarFilms: {
          data: mockFilms.slice(0, 4),
          isLoading: true,
        },
      }
    });

    render(
      <Provider store={similarFilmsLoadingStore}>
        <BrowserRouter>
          <SimilarFilmList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });


});
