import { render, screen, fireEvent } from '@testing-library/react';
import ShowMoreBtn from './show-more-btn';

describe('ShowMoreBtn component', () => {
  it('renders a button with correct text', () => {
    const onClickHandler = jest.fn();
    render(<ShowMoreBtn onClickHandler={onClickHandler} />);

    expect(screen.getByText('Show more')).toBeInTheDocument();
  });
  it('calls onClickHandler on button click', () => {
    const onClickHandler = jest.fn();
    render(<ShowMoreBtn onClickHandler={onClickHandler} />);

    fireEvent.click(screen.getByText('Show more'));

    expect(onClickHandler).toHaveBeenCalledTimes(1);
  });


});
