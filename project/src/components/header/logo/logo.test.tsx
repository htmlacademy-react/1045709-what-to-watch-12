import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Logo from './logo';

describe('Logo', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );

    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(screen.getAllByText('W')).toHaveLength(2);
    expect(link).toContainElement(screen.getByText('T'));
    expect(link).toHaveAttribute('href', '/');
  });


});
