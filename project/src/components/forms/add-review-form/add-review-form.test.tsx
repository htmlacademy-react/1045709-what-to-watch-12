import { fireEvent, render, screen } from '@testing-library/react';
import AddReviewForm from './add-review-form';
import { makeFakeFilm, makeFakeReview } from '../../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../../const';
import { Provider } from 'react-redux';


const mockStore = configureMockStore();
const mockFilm = makeFakeFilm();
const mockFilms = [makeFakeFilm(), makeFakeFilm()];
const mockReviews = [makeFakeReview(), makeFakeReview()];

const store = {
  USER: {authorizationStatwus: AuthorizationStatus.Auth},
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

describe('AddReviewForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({...store})}>
        <AddReviewForm filmInReview={mockFilm} />
      </Provider>
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('should update the rating field value in the formData state when the user changes the input', () => {
    render(
      <Provider store={mockStore({...store})}>
        <AddReviewForm filmInReview={mockFilm} />
      </Provider>
    );
    const ratingInput: HTMLInputElement = screen.getByLabelText(/10/);
    fireEvent.click(ratingInput);
    expect(ratingInput.checked).toBe(true);
  });

  it('should update the text field value in the formData state when the user enters the comment', () => {
    render(
      <Provider store={mockStore({...store})}>
        <AddReviewForm filmInReview={mockFilm} />
      </Provider>
    );
    const textAreaInput: HTMLTextAreaElement = screen.getByPlaceholderText(/Review text/);
    fireEvent.change(textAreaInput, { target: { value: 'Mock comment' } });
    expect(textAreaInput.value).toEqual('Mock comment');
  });


});
