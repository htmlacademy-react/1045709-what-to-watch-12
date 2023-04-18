type ShowMoreBtnProps = {
  onClickHandler: () => void;
}

function ShowMoreBtn({onClickHandler}: ShowMoreBtnProps): JSX.Element {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onClickHandler}>
        Show more
      </button>
    </div>

  );
}


export default ShowMoreBtn;
