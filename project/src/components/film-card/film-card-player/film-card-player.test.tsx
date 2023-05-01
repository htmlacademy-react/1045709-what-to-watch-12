import { render, screen } from '@testing-library/react';
import { makeFakeFilm } from '../../../utils/mocks';
import FilmCardPlayer from './film-card-player';

describe('FilmCardPlayer', () => {
  const mockFilm = makeFakeFilm();
  it('renders the video player with poster image and video source', () => {
    render(<FilmCardPlayer videoSrc={mockFilm.videoLink} posterSrc={mockFilm.posterImage}/>);
    const videoElement = screen.getByTestId('film-video');

    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute('poster', mockFilm.posterImage);
  });

  it('renders the video tag with provided props', () => {
    render(<FilmCardPlayer videoSrc={mockFilm.videoLink} posterSrc={mockFilm.posterImage}/>);

    const videoElement = screen.getByTestId('film-video');

    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute('poster', mockFilm.posterImage);
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('starts video playback after 1000', () => {
    render(<FilmCardPlayer videoSrc={mockFilm.videoLink} posterSrc={mockFilm.posterImage}/>);

    const videoElement: HTMLVideoElement = screen.getByTestId('film-video');
    videoElement.play = jest.fn();

    jest.advanceTimersByTime(1000);

    expect(videoElement.play).toHaveBeenCalled();
  });


});
