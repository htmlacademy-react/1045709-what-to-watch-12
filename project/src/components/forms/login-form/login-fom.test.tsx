import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './login-form';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../../const';
import { makeFakeFilm, makeFakeReview } from '../../../utils/mocks';
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

describe('LoginForm', () => {
  it('should display error message when email is invalid', () => {
    render(
      <Provider store={mockStore({...store})}>
        <LoginForm />
      </Provider>
    );
    const loginInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Sign in');

    fireEvent.change(loginInput, { target: { value: 'invalidemail' } });
    fireEvent.change(passwordInput, { target: { value: 'P@ssword123' } });
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText(/Email must be a valid email/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should display error message when password is invalid', () => {
    render(
      <Provider store={mockStore({...store})}>
        <LoginForm />
      </Provider>
    );
    const loginInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Sign in');

    fireEvent.change(loginInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText(/Password must contain at least one letter and one number/i);
    expect(errorMessage).toBeInTheDocument();
  });


});
