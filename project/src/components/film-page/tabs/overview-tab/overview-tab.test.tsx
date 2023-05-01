import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeFilm } from '../../../../utils/mocks';
import OverviewTab, { getTextFilmRating } from './overview-tab';

const mockFilm = makeFakeFilm();

describe('OverviewTab component', () => {
  it('should render film title and description', () => {
    render(
      <BrowserRouter>
        <OverviewTab film={mockFilm} />
      </BrowserRouter>
    );
    const descriptionElement = screen.getByText(mockFilm.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  it('should render film director and starring cast', () => {
    render(
      <BrowserRouter>
        <OverviewTab film={mockFilm} />
      </BrowserRouter>
    );
    const directorElement = screen.getByText(`Director: ${mockFilm.director}`);
    const starringElement = screen.getByText(`Starring: ${mockFilm.starring.join(', ')} and other`);
    expect(directorElement).toBeInTheDocument();
    expect(starringElement).toBeInTheDocument();
  });

  it('should render rating meta info', () => {
    render(
      <BrowserRouter>
        <OverviewTab film={mockFilm} />
      </BrowserRouter>
    );
    const ratingElement = screen.getByText(mockFilm.rating.toString());
    const countElement = screen.getByText(`${mockFilm.scoresCount} ratings`);
    expect(ratingElement).toBeInTheDocument();
    expect(countElement).toBeInTheDocument();
  });

  it('should render correct text rating', () => {
    render(
      <BrowserRouter>
        <OverviewTab film={mockFilm} />
      </BrowserRouter>
    );
    const textRatingElement = screen.getByText(getTextFilmRating(mockFilm.rating));
    expect(textRatingElement).toBeInTheDocument();
  });


});
