import { fireEvent, render, screen } from '@testing-library/react';
import { makeFakeFilm } from '../../utils/mocks';
import { AppRoute } from '../../const';
import FilmCard from './film-card';
import { BrowserRouter } from 'react-router-dom';

describe('FilmCard', () => {
  const mockFilm = makeFakeFilm();
  const handleMouseOver = jest.fn();
  const handleMouseOut = jest.fn();

  beforeEach(() => {
    handleMouseOver.mockClear();
    handleMouseOut.mockClear();
  });

  it('should render film card image by default', () => {
    render(
      <BrowserRouter>
        <FilmCard film={mockFilm} />
      </BrowserRouter>
    );

    const filmCard = screen.getByRole('article');
    const filmCardImage: HTMLImageElement = screen.getByRole('img');

    expect(filmCard).toBeInTheDocument();
    expect(filmCardImage).toBeInTheDocument();
    expect(filmCardImage.src).toBe(`${window.location.origin}${mockFilm.previewImage}`);
  });

  it('should render the video player on hover and hide it on blur', () => {
    render(
      <BrowserRouter>
        <FilmCard film={mockFilm} />
      </BrowserRouter>
    );

    const filmCard = screen.getByRole('article');
    const filmCardImage = screen.getByRole('img');

    expect(filmCardImage).toBeVisible();

    fireEvent.mouseOver(filmCard);
    expect(screen.getByTestId('film-video')).toBeVisible();

    fireEvent.mouseOut(filmCard);
    expect(filmCardImage).not.toBeVisible();
  });

  it('should navigate to the film page on click', () => {
    render(
      <BrowserRouter>
        <FilmCard film={mockFilm} />
      </BrowserRouter>
    );

    const filmCardImage: HTMLImageElement = screen.getByRole('img');
    expect(filmCardImage).toBeInTheDocument();
    fireEvent.click(filmCardImage);
    expect(window.location.href).toBe(`${window.location.origin}${AppRoute.Films}/${mockFilm.id}`);

    const filmCardTitle = screen.getByText(mockFilm.name);
    expect(filmCardTitle).toBeInTheDocument();
    fireEvent.click(filmCardTitle);
    expect(window.location.href).toBe(`${window.location.origin}${AppRoute.Films}/${mockFilm.id}`);
  });


});
