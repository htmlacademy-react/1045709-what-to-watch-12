// import { render, screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// import { configureMockStore } from '@jedmao/redux-mock-store';
// import { AuthorizationStatus } from '../../const';
// import { makeFakeFilm, makeFakeReview } from '../../utils/mocks';
// import FavoriteFilmsPage from './favorite-films-page';

// jest.mock('react-redux');

// const mockStore = configureMockStore();

// const mockFilm = makeFakeFilm();
// const mockFilms = [makeFakeFilm(), makeFakeFilm()];
// const mockReviews = [makeFakeReview(), makeFakeReview()];

// const store = {
//   USER: {authorizationStatus: AuthorizationStatus.Auth},
//   FILMS_DATA: {
//     films: {
//       data: mockFilms,
//       filteredData: mockFilms,
//       isLoading: false,
//     },
//     favoriteFilms: {
//       data: mockFilms,
//       isLoading: false,
//       isUpdating: false,
//     },
//     similarFilms: {
//       data: mockFilms.slice(0, 4),
//       isLoading: false,
//     },
//     film: {
//       data: mockFilm,
//       isLoading: false,
//     },
//     promoFilm: {
//       data: mockFilm,
//       isLoading: false,
//     }
//   },
//   REVIEWS_DATA: {
//     reviews: mockReviews,
//     isReviewsLoading: false,
//     isReviewPosting: false,
//   },
//   FILM_LIST: {activeGenre: 'All', renderedFilmsQuantity: 8},
// };


// describe('FavoriteFilmsPage component', () => {

//   it('should render correctly', () => {
//     render(
//       <Provider store={mockStore({...store})}>
//         <BrowserRouter>
//           <FavoriteFilmsPage />
//         </BrowserRouter>
//       </Provider>,
//     );

//     expect(screen.getByText(`My list ${mockFilms.length}`)).toBeInTheDocument();
//   });


// });


import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import FavoriteFilmsPage from './favorite-films-page';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
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

describe('Favorite Films Page', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({...store})}>
        <BrowserRouter>
          <FavoriteFilmsPage />
        </BrowserRouter>
      </Provider>
    );

    const favoriteFilmListTitle = screen.getByText('My list');
    expect(favoriteFilmListTitle).toBeInTheDocument();

    const favoriteFilmsQuantity = screen.getByText(mockFilms.length);
    expect(favoriteFilmsQuantity).toBeInTheDocument();

  });


});
