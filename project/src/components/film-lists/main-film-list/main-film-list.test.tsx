import { render, screen, fireEvent } from '@testing-library/react';
import MainFilmList from './main-film-list';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { resetRenderedFilms, renderMoreFilms } from '../../../store/film-list/film-list';
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

const storeNotRenderedAllFilms = mockStore({
  ...store,
  FILM_LIST: {activeGenre: 'All', renderedFilmsQuantity: 1},
});

const storeRenderedAllFilms = mockStore({
  ...store,
  FILM_LIST: {activeGenre: 'All', renderedFilmsQuantity: 3},
});

describe('MainFilmList component', () => {

  beforeEach(() => {
    storeNotRenderedAllFilms.clearActions();
    storeRenderedAllFilms.clearActions();
  });

  it('should render a list of films with correct length', () => {
    render(
      <Provider store={storeRenderedAllFilms}>
        <BrowserRouter>
          <MainFilmList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getAllByRole('article')).toHaveLength(mockFilms.length);
  });

  it('should render ShowMoreBtn when renderedFilmsQuantity is less than filteredFilms length', () => {
    render(
      <Provider store={storeNotRenderedAllFilms}>
        <BrowserRouter>
          <MainFilmList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Show more')).toBeInTheDocument();
  });

  it('should not render ShowMoreBtn when renderedFilmsQuantity is equal to filteredFilms length', () => {
    render(
      <Provider store={storeRenderedAllFilms}>
        <BrowserRouter>
          <MainFilmList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByText('Show more')).toBeNull();
  });

  it('should dispatch renderMoreFilms action on ShowMoreBtn click', () => {
    render(
      <Provider store={storeNotRenderedAllFilms}>
        <BrowserRouter>
          <MainFilmList />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Show more'));
    expect(storeNotRenderedAllFilms.getActions()).toContainEqual(renderMoreFilms());
  });

  it('should dispatch resetRenderedFilms action on unmount', () => {
    const { unmount } = render(
      <Provider store={storeRenderedAllFilms}>
        <BrowserRouter>
          <MainFilmList />
        </BrowserRouter>
      </Provider>
    );
    unmount();

    expect(storeRenderedAllFilms.getActions()).toContainEqual(resetRenderedFilms());
  });


});
