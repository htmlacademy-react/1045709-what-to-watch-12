import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import useGetFilmInPage from '../../hooks/useGetFilmInPage';
import { AppRoute } from '../../const';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import LoadingSpinner from './loading-spinner/loading-spinner';
import PlayBtn from './control-btn/play-btn';
import PauseBtn from './control-btn/pause-btn';

const formatRemainingTime = (time: number) => {
  if (time < 3600) {
    return format(time * 1000, 'mm:ss');
  }

  return format(time * 1000, 'hh:mm:ss');
};


function VideoPlayer(): JSX.Element {
  const navigate = useNavigate();
  const filmInVideo = useGetFilmInPage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentTime = videoRef.current?.currentTime as number;
  const durationTime = videoRef.current?.duration as number;
  const runtimeProgress = (currentTime / durationTime) * 100;

  const filmLoadedDataHandler = () => setIsLoaded(true);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      return;
    }

    videoElement.addEventListener('loadeddata', filmLoadedDataHandler);

    return () => {
      videoElement.removeEventListener('loadeddata', filmLoadedDataHandler);
    };
  }, [videoRef]);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.ontimeupdate = () => setRemainingTime(durationTime - currentTime);

  }, [currentTime, durationTime]);

  const handleControlBtnClick = useCallback(() => {
    if (!isPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isPlaying]);

  const fullScreenBtnClickHandler = () => {
    videoRef.current?.requestFullscreen();
  };

  if (!filmInVideo) {
    return <NotFoundPage />;
  }

  return (
    <div className="player">

      {!isLoaded ? <LoadingSpinner /> : null}

      <video
        ref={videoRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        src={filmInVideo.videoLink}
        className="player__video"
        poster={filmInVideo.backgroundImage}
      />

      <button
        onClick={() => navigate(`${AppRoute.Films}/${filmInVideo.id}`)}
        type="button"
        className="player__exit"
      >
          Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={currentTime} max={durationTime}></progress>
            <div className="player__toggler" style={{left: `${runtimeProgress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{formatRemainingTime(remainingTime)}</div>
        </div>

        <div className="player__controls-row">
          {
            isPlaying
              ?
              <PauseBtn onClick={handleControlBtnClick}/>
              :
              <PlayBtn onClick={handleControlBtnClick}/>
          }
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen" onClick={fullScreenBtnClickHandler}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
