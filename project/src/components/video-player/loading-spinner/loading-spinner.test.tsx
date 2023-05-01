import { render, screen } from '@testing-library/react';
import LoadingSpinner from './loading-spinner';

describe('LoadingSpinner', () => {
  it('renders correctly', () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('has the correct CSS styles', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('spinner');

    expect(spinner).toHaveStyle('position: absolute');
    expect(spinner).toHaveStyle('top: 33%');
    expect(spinner).toHaveStyle('left: 46%');
    expect(spinner).toHaveStyle('border: 0.5rem solid #e9e9e9');
    expect(spinner).toHaveStyle('borderTop: 0.5rem solid blue');
    expect(spinner).toHaveStyle('borderRadius: 50%');
    expect(spinner).toHaveStyle('width: 10rem');
    expect(spinner).toHaveStyle('height: 10rem');
  });

});
