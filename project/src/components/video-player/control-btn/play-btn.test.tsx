import { render, screen, fireEvent } from '@testing-library/react';
import PlayBtn from './play-btn';

test('should call onClick function when button is clicked', () => {
  const mockOnClick = jest.fn();
  render(<PlayBtn onClick={mockOnClick} />);

  const button = screen.getByTestId('play-btn');

  fireEvent.click(button);

  expect(mockOnClick).toBeCalledTimes(1);
});

test('should render PlayBtn correctly', () => {
  const mockOnClick = jest.fn();
  render(<PlayBtn onClick={mockOnClick} />);

  const button = screen.getByTestId('play-btn');

  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent(/play/i);
});
