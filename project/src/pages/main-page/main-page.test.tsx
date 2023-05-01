import { render, screen } from '@testing-library/react';
import MainPage from './main-page';

jest.mock('../../components/promo-film/promo-film.tsx', () => function PromoFilmMock() {
  return <div>PromoFilm</div>;
});

jest.mock('../../components/genre-filters-list/genre-filters-list.tsx', () => function GenreFiltersListMock() {
  return <div>GenreFiltersList</div>;
});

jest.mock('../../components/film-lists/main-film-list/main-film-list.tsx', () => function MainFilmListMock() {
  return <div>MainFilmList</div>;
});

jest.mock('../../components/footer/footer.tsx', () => function FooterMock() {
  return <div>Footer</div>;
});

describe('MainPage component', () => {
  it('should render without errors', () => {
    render(<MainPage />);
    const promoFilmElement = screen.getByText('PromoFilm');
    const genreFiltersListElement = screen.getByText('GenreFiltersList');
    const mainFilmListElement = screen.getByText('MainFilmList');
    const footerElement = screen.getByText('Footer');
    expect(promoFilmElement).toBeInTheDocument();
    expect(genreFiltersListElement).toBeInTheDocument();
    expect(mainFilmListElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();

    const hiddenTilte = screen.queryByText('Catalog');
    expect(hiddenTilte).toBeInTheDocument();
  });


});
