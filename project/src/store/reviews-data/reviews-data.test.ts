import { toast } from 'react-toastify';
import { reviewsData } from './reviews-data';
import { fetchReviewsAction, postReviewAction } from '../api-actions';
import { makeFakeReview } from '../../utils/mocks';

const reviews = [makeFakeReview(), makeFakeReview()];

jest.mock('react-toastify');

describe('Reducer: reviewsData', () => {
  const state = {
    reviews: [],
    isReviewsLoading: false,
    isReviewPosting: false
  };

  describe('fetchReviewsAction', () => {
    it('without additional parameters should return initial state', () => {
      expect(reviewsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
        .toEqual(state);
    });

    it('should set isReviewsLoading to true on fetchReviewsAction.pending', () => {
      expect(reviewsData.reducer(state, {type: fetchReviewsAction.pending.type}))
        .toEqual({
          ...state,
          isReviewsLoading: true
        });
    });

    it('should update reviews by load reviews + set isReviewsLoading to false', () => {
      expect(reviewsData.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: reviews}))
        .toEqual({
          ...state,
          reviews: reviews,
          isReviewsLoading: false
        });
    });


  });

  describe('postReviewAction', () => {
    it('should set isReviewPosting to true when postReviewAction.pending is called', () => {
      expect(reviewsData.reducer(state, {type: postReviewAction.pending.type}))
        .toEqual({
          ...state,
          isReviewPosting: true
        });
    });

    it('should set isReviewPosting to false when postReviewAction.fulfilled is called', () => {
      expect(reviewsData.reducer(state, {type: postReviewAction.fulfilled.type}))
        .toEqual({
          ...state,
          isReviewPosting: false
        });
    });

    it('should set favoriteFilms isUpdating to false & show error when postReviewAction.rejected is called', () => {
      const errorMsg = 'An error occurred';
      const action = {
        type: postReviewAction.rejected.type,
        payload: { arg: null, requestStatus: 'rejected', requestId: '', aborted: false, condition: true },
        error: { message: errorMsg },
      };
      expect(reviewsData.reducer(state, action))
        .toEqual({
          ...state,
          isReviewPosting: false
        });
      expect(toast.error).toHaveBeenCalledWith(errorMsg);
    });


  });

});
