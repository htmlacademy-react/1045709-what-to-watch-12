import { render, screen } from '@testing-library/react';
import { makeFakeFilm } from '../../utils/mocks';
import Header from './header';

jest.mock('./logo/logo.tsx', () => function LogoMock() {
  return <div>Logo</div>;
});

jest.mock('./user-block/user-block.tsx', () => function UserBlockMock() {
  return <div>UserBlock</div>;
});

describe('Header component', () => {
  it('should render without errors', () => {
    const film = makeFakeFilm();
    render(<Header film={film} />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveAttribute('class', 'page-header film-card__head');
  });
});
