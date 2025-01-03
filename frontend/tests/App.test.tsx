import { render, screen } from '@testing-library/react';
import App from '../src/App';
import '@testing-library/jest-dom';

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/DaisyUI Button/i);
    expect(linkElement).toBeInTheDocument();
});
