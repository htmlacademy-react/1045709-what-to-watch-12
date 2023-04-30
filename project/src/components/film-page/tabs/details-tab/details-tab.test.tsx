import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoute } from '../../../../const';
import { makeFakeFilm } from '../../../../utils/mocks';
import DetailsTab from './details-tab';

const mockFilm = makeFakeFilm();

describe('DetailsTab component', () => {
  it('renders DetailsTab component correctly', () => {

    render(
      <Router>
        <DetailsTab film={mockFilm} />
      </Router>
    );

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Director')).toBeInTheDocument();
    expect(screen.getByText('Starring')).toBeInTheDocument();
    expect(screen.getByText('Run Time')).toBeInTheDocument();
    expect(screen.getByText('Genre')).toBeInTheDocument();
    expect(screen.getByText('Released')).toBeInTheDocument();
  });

  it('renders correct Links in DetailsTab component', () => {

    render(
      <Router>
        <DetailsTab film={mockFilm} />
      </Router>
    );

    expect(screen.getByText('Overview').getAttribute('href')).toBe(`${AppRoute.Films}/${mockFilm.id}`);
    expect(screen.getByText('Details').getAttribute('href')).toBe('/');
    expect(screen.getByText('Reviews').getAttribute('href')).toBe(
      `${AppRoute.Films}/${mockFilm.id}/${AppRoute.FilmReviewsTab}`
    );
  });
});
