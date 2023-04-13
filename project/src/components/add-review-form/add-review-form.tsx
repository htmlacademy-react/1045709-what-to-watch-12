import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postReviewAction } from '../../store/api-actions';
import { Film } from '../../types/film';
import { getReviewDataPostingStatus } from '../../store/reviews-data/selectors';

const REVIEW_TEXT_MIN_LENGTH = 50;
const REVIEW_TEXT_MAX_LENGTH = 400;

type AddReviewFormProps = {
  filmInReview: Film;
}

type ChangeEvent = {
  target: { name: string; value: string };
};

function AddReviewForm({filmInReview}: AddReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isReviewsDataPosting = useAppSelector(getReviewDataPostingStatus);

  const [formData, setFormData] = useState({
    rating: 0,
    text: ''
  });

  const isValid = formData.text.length >= REVIEW_TEXT_MIN_LENGTH && formData.text.length <= REVIEW_TEXT_MAX_LENGTH && formData.rating !== 0;

  const fieldChangeHandle = (evt: ChangeEvent) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (isValid) {
      dispatch(postReviewAction({
        rating: formData.rating,
        comment: formData.text,
        filmId: filmInReview.id
      }));
    }
  };

  return (
    <form action="#" className="add-review__form" onSubmit={formSubmitHandler}>
      <fieldset style={{border: 'none'}} disabled={isReviewsDataPosting}>
        <div className="">
          <div className="rating__stars">
            <input onChange={fieldChangeHandle} className="rating__input" id="star-10" type="radio" name="rating" value="10" />
            <label className="rating__label" htmlFor="star-10">Rating 10</label>

            <input onChange={fieldChangeHandle} className="rating__input" id="star-9" type="radio" name="rating" value="9" />
            <label className="rating__label" htmlFor="star-9">Rating 9</label>

            <input onChange={fieldChangeHandle} className="rating__input" id="star-8" type="radio" name="rating" value="8" />
            <label className="rating__label" htmlFor="star-8">Rating 8</label>

            <input onChange={fieldChangeHandle} className="rating__input" id="star-7" type="radio" name="rating" value="7" />
            <label className="rating__label" htmlFor="star-7">Rating 7</label>

            <input onChange={fieldChangeHandle} className="rating__input" id="star-6" type="radio" name="rating" value="6" />
            <label className="rating__label" htmlFor="star-6">Rating 6</label>

            <input onChange={fieldChangeHandle} className="rating__input" id="star-5" type="radio" name="rating" value="5" />
            <label className="rating__label" htmlFor="star-5">Rating 5</label>

            <input onChange={fieldChangeHandle} className="rating__input" id="star-4" type="radio" name="rating" value="4" />
            <label className="rating__label" htmlFor="star-4">Rating 4</label>

            <input onChange={fieldChangeHandle} className="rating__input" id="star-3" type="radio" name="rating" value="3" />
            <label className="rating__label" htmlFor="star-3">Rating 3</label>

            <input onChange={fieldChangeHandle} className="rating__input" id="star-2" type="radio" name="rating" value="2" />
            <label className="rating__label" htmlFor="star-2">Rating 2</label>

            <input onChange={fieldChangeHandle} className="rating__input" id="star-1" type="radio" name="rating" value="1" />
            <label className="rating__label" htmlFor="star-1">Rating 1</label>
          </div>
        </div>

        <div className="add-review__text">
          <textarea onChange={fieldChangeHandle} className="add-review__textarea" name="text" id="review-text" placeholder="Review text"></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={!isValid}>Post</button>
          </div>

        </div>
      </fieldset>
    </form>
  );
}

export default AddReviewForm;
