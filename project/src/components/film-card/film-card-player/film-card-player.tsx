import { useEffect, useRef } from 'react';

const DELAY_BEFORE_PLAYBACK = 1000;

type VideoPlayerProps = {
  videoSrc: string;
  posterSrc: string;
};

function FilmCardPlayer({videoSrc, posterSrc}: VideoPlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.volume = 0;
        videoRef.current.play();
      }
    }, DELAY_BEFORE_PLAYBACK);
  }, []);


  return (
    <video
      poster={posterSrc}
      ref={videoRef}
      width="280"
      height="175"
      data-testid="film-video"
    >
      <source src={videoSrc} />
    </video>
  );
}

export default FilmCardPlayer;
