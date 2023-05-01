import { memo } from 'react';

type PauseBtnProps = {
  onClick: () => void;
}

function PauseBtn({onClick}: PauseBtnProps): JSX.Element {
  return (
    <button data-testid="pause-btn" type="button" className="player__play" onClick={onClick}>
      <svg
        viewBox='0 0 14 21'
        width='14'
        height='21'
      >
        <use xlinkHref='#pause'></use>
      </svg>
      <span>Pause</span>
    </button>
  );
}

export default memo(PauseBtn);
