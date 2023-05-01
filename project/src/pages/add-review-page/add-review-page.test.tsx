import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../hocs/history-route/history-route';
import AddReviewPage from './add-review-page';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { AuthorizationStatus } from '../../const';
import { makeFakeFilm, makeFakeReview } from '../../utils/mocks';
import { Provider } from 'react-redux';

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


describe('Component: AddReviewPage', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({...store})}>
        <HistoryRouter history={history}>
          <AddReviewPage />
        </HistoryRouter>
      </Provider>
    );

    const addReviewLink = screen.getByRole('link', {name: 'Add review'});
    const filmInReviewLink = screen.getByRole('link', {name: mockFilm.name});

    expect(addReviewLink).toBeInTheDocument();
    expect(filmInReviewLink).toBeInTheDocument();
  });


});
