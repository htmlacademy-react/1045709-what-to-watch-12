import { render, screen, fireEvent } from '@testing-library/react';
import PauseBtn from './pause-btn';

describe('PauseBtn', () => {
  test('should render the Pause button', () => {
    render(<PauseBtn onClick={jest.fn()} />);
    expect(screen.getByTestId('pause-btn')).toBeInTheDocument();
  });

  test('should call onClick callback when button is clicked', () => {
    const handleClick = jest.fn();
    render(<PauseBtn onClick={handleClick} />);
    const button = screen.getByTestId('pause-btn');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});
