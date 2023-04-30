import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useParams } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../../hocs/history-route/history-route';
import { makeFakeFilm, makeFakeReview } from '../../../utils/mocks';
import { AuthorizationStatus } from '../../../const';
import Tabs from './tabs';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

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

describe('Tabs component', () => {
  const mockParams = { tab: 'overview' };
  const history = createMemoryHistory();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    (useParams as jest.Mock).mockReturnValue(mockParams);
  });

  it('should render OverviewTab by default', () => {
    render(
      <Provider store={mockStore({...store})}>
        <HistoryRouter history={history}>
          <Tabs film={mockFilm} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(`${mockFilm.scoresCount} ratings`)).toBeInTheDocument();
    expect(screen.getByText(`Director: ${mockFilm.director}`)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.description)).toBeInTheDocument();
  });

  it('should render DetailsTab if Details tab is selected', () => {
    (useParams as jest.Mock).mockReturnValue({ tab: 'details' });

    render(
      <Provider store={mockStore({...store})}>
        <HistoryRouter history={history}>
          <Tabs film={mockFilm} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText('Released')).toBeInTheDocument();
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
  });

  it('should render ReviewTab if Reviews tab is selected', () => {
    (useParams as jest.Mock).mockReturnValue({ tab: 'reviews' });

    render(
      <Provider store={mockStore({...store})}>
        <HistoryRouter history={history}>
          <Tabs film={mockFilm} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(`${mockReviews[0].comment}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockReviews[0].user.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockReviews[1].comment}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockReviews[1].user.name}`)).toBeInTheDocument();
  });


});
