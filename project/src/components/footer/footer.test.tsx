import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './footer';

describe('Footer component', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(screen.getAllByText('W')).toHaveLength(2);
    expect(link).toContainElement(screen.getByText('T'));
    expect(link).toHaveAttribute('href', '/');

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText('© 2019 What to watch Ltd.')).toBeInTheDocument();
  });


});
