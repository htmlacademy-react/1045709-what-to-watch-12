export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
  };
};

export type Reviews = Review[];

export type AddReview = {
  comment: string;
  rating: number;
  filmId: number;
};
