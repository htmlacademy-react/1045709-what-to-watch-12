import { memo } from 'react';

type PlayBtnProps = {
  onClick: () => void;
}

function PlayBtn({onClick}: PlayBtnProps): JSX.Element {
  return (
    <button type="button" className="player__play" onClick={onClick}>
      <svg
        viewBox='0 0 19 19'
        width='19'
        height='19'
      >
        <use xlinkHref='#play-s'></use>
      </svg>
      <span>Play</span>
    </button>
  );
}

export default memo(PlayBtn);
