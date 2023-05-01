import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../hocs/history-route/history-route';
import VideoPlayer from '../../components/video-player/video-player';
import { makeFakeFilm } from '../../utils/mocks';

const mockFilm = makeFakeFilm();

describe('Component: VideoPlayer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <VideoPlayer film={mockFilm} />
      </HistoryRouter>
    );

    const exitButton = screen.getByRole('button', {name: 'Exit'});

    expect(exitButton).toBeInTheDocument();
  });


});
