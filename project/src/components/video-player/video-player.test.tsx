import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeFilm } from '../../utils/mocks';
import VideoPlayer from './video-player';

const testFilm = makeFakeFilm();

describe('VideoPlayer', () => {
  it('renders the video element with correct attributes', () => {
    render(
      <BrowserRouter>
        <VideoPlayer film={testFilm} />
      </BrowserRouter>
    );

    const videoElement = screen.getByTestId('video-element');

    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute('src', testFilm.videoLink);
    expect(videoElement).toHaveAttribute('poster', testFilm.backgroundImage);
  });

  it('renders loading spinner while video is loading', () => {
    render(
      <BrowserRouter>
        <VideoPlayer film={testFilm} />
      </BrowserRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });


});

