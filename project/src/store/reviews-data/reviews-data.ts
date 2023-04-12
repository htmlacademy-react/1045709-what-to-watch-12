import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { NameSpace } from '../../const';
import { ReviewData } from '../../types/state';
import { fetchReviewsAction, postReviewAction } from '../api-actions';

const initialState: ReviewData = {
  reviews: [],
  isReviewsLoading: false,
  isReviewPosting: false,
};

export const reviewsData = createSlice({
  name: NameSpace.ReviewsData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoading = false;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.isReviewPosting = true;
      })
      .addCase(postReviewAction.fulfilled, (state) => {
        state.isReviewPosting = false;
      })
      .addCase(postReviewAction.rejected, (state, action) => {
        state.isReviewPosting = false;
        toast.error(action.error.message);
      });
  }
});
