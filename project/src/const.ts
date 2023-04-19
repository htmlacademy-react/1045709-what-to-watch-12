export enum AppRoute {
  Root = '/',
  Login = '/login',
  MyList = '/mylist',
  VideoPlayer = '/player',
  Films = '/films',
  Film = '/films/:id',
  FilmTab = ':tab',
  FilmDetailsTab = 'details',
  FilmReviewsTab = 'reviews',
  FilmAddReview = 'review',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Films = '/films',
  FavoriteFilms = '/favorite',
  SimilarFilms = 'similar',
  PromoFilm = '/promo',
  Reviews = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum NameSpace {
  FilmsData = 'FILMS_DATA',
  ReviewsData = 'REVIEWS_DATA',
  FilmList = 'FILM_LIST',
  User = 'USER',
}

export const FiltersByGenre = {
  ALL_GENRES: {
    filterName: 'All genres',
    filterValue: 'All'
  },
  COMEDIES: {
    filterName: 'Comedies',
    filterValue: 'Comedy'
  },
  CRIME: {
    filterName: 'Crime',
    filterValue: 'Crime'
  },
  DOCUMENTARY: {
    filterName: 'Documentary',
    filterValue: 'Documentary'
  },
  DRAMAS: {
    filterName: 'Dramas',
    filterValue: 'Drama'
  },
  HORROR: {
    filterName: 'Horror',
    filterValue: 'Horror'
  },
  KIDS_AND_FAMILY: {
    filterName: 'Kids & Family',
    filterValue: 'Family'
  },
  ROMANCE: {
    filterName: 'Romance',
    filterValue: 'Romance'
  },
  SCI_FI: {
    filterName: 'Sci-Fi',
    filterValue: 'SciFi'
  },
  THRILLERS: {
    filterName: 'Thrillers',
    filterValue: 'Thriller'
  },
} as const;

export const RatingValues = {
  BAD: {
    startValue: 0,
    text: 'Bad'
  },
  NORMAL: {
    startValue: 3,
    text: 'Normal'
  },
  GOOD: {
    startValue: 5,
    text: 'Good'
  },
  VERY_GOOD: {
    startValue: 8,
    text: 'Very good'
  },
  AWESOME: {
    startValue: 10,
    text: 'Awesome'
  }
} as const;

export const DEFAULT_RENDERED_FILMS_QUANTITY = 8;
export const FILMS_TO_RENDER_QUANTITY = 8;

export const REDIRECT_TO_ROUTE_ACTION_TYPE = '/redirectToRoute';
