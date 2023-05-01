// import { fireEvent, render, screen } from '@testing-library/react';
// import AddReviewForm from './add-review-form';
// import { useAppDispatch, useAppSelector } from '../../../hooks';
// import { postReviewAction } from '../../../store/api-actions';
// import { makeFakeFilm } from '../../../utils/mocks';

// jest.mock('../../../hooks', () => ({
//   useAppSelector: jest.fn(),
//   useAppDispatch: jest.fn(),
// }));

// jest.mock('../../../store/api-actions', () => ({
//   postReviewAction: jest.fn(),
// }));

// const mockFilm = makeFakeFilm();

// const mockedUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;
// const mockedUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
// const mockedPostReviewAction = postReviewAction as jest.MockedFunction<typeof postReviewAction>;

// describe('AddReviewForm', () => {
//   beforeEach(() => {
//     mockedUseAppSelector.mockClear();
//     mockedUseAppDispatch.mockClear();
//     mockedPostReviewAction.mockClear();
//   });

//   it('renders form with rating and review text field', () => {
//     render(<AddReviewForm filmInReview={mockFilm} />);
//     expect(screen.getByLabelText('Rating 10')).toBeInTheDocument();
//     expect(screen.getByLabelText('Rating 1')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Review text')).toBeInTheDocument();
//   });

//   it('dispatches postReviewAction with form data when post button is clicked', () => {
//     render(<AddReviewForm filmInReview={mockFilm} />);
//     fireEvent.click(screen.getByLabelText('Rating 10'));
//     fireEvent.change(screen.getByPlaceholderText('Review text'), { target: { value: 'Test review text' } });
//     fireEvent.click(screen.getByRole('button'));
//     expect(mockedPostReviewAction).toHaveBeenCalledWith({
//       rating: 10,
//       comment: 'Test review text',
//       filmId: 1,
//     });
//   });


// });


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
