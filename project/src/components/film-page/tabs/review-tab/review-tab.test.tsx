import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeFilm, makeFakeReview } from '../../../../utils/mocks';
import { AuthorizationStatus } from '../../../../const';
import ReviewTab from './review-tab';

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

const storeReviewsLoading = mockStore({
  ...store,
  REVIEWS_DATA: {
    ...store.REVIEWS_DATA,
    isReviewsLoading: true,
  },
});


describe('Component: ReviewTab', () => {

  it('should render correctly', () => {
    render(
      <Provider store={mockStore({...store})}>
        <BrowserRouter>
          <ReviewTab film={mockFilm} />
        </BrowserRouter>
      </Provider>
    );

    const element = screen.getByText(/Reviews/i);
    expect(element).toBeInTheDocument();
  });

  it('should display LoadingScreen when reviews data is loading', () => {
    render(
      <Provider store={storeReviewsLoading}>
        <BrowserRouter>
          <ReviewTab film={mockFilm} />
        </BrowserRouter>
      </Provider>
    );

    const element = screen.getByText(/Loading .../i);
    expect(element).toBeInTheDocument();
  });

  it('should display comments when reviews data is loaded', () => {
    render(
      <Provider store={mockStore({...store})}>
        <BrowserRouter>
          <ReviewTab film={mockFilm} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(mockReviews[0].comment)).toBeInTheDocument();

    expect(screen.getByText(mockReviews[0].user.name)).toBeInTheDocument();

    expect(screen.getByText(mockReviews[1].comment)).toBeInTheDocument();

    expect(screen.getByText(mockReviews[1].user.name)).toBeInTheDocument();
  });

});
