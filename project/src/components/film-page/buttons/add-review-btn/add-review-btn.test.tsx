import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../../../hocs/history-route/history-route';
import AddReviewBtn from './add-review-btn';

describe('AddReviewBtn', () => {
  const history = createMemoryHistory();
  const filmId = 1;

  it('should render Add review button', () => {
    render(
      <HistoryRouter history={history}>
        <AddReviewBtn filmId={filmId} />
      </HistoryRouter>
    );
    expect(screen.getByText('Add review')).toBeInTheDocument();
  });

  it('should render Link with correct filmId and url path', () => {
    render(
      <HistoryRouter history={history}>
        <AddReviewBtn filmId={filmId} />
      </HistoryRouter>
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/films/${filmId}/review`);
  });
});
