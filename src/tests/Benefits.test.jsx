import React from 'react';
import { render, screen } from '@testing-library/react';
import Benefits from '../components/Benefits';

jest.mock('framer-motion', () => ({
  motion: {
    div: require('react').forwardRef(({ children, whileInView, initial, animate, variants, ...props }, ref) => (
      <div {...props} ref={ref}>
        {children}
      </div>
    )),
  },
  fadeInUp: {}, 
}));

jest.mock('lottie-react', () => {
    return ({ animationData, loop, ...props }) => (
        <div data-testid="lottie-animation" {...props} />
    );
});

describe('Benefits Component', () => {
  const benefitTitles = [
    "Built for Nepali Shop Owners",
    "Works on Mobile & Web",
    "Saves Time, Reduces Error",
    "Clean, Easy to Use Interface",
    "Insightful Reports",
    "Automated Remaind",
  ];

  test('renders the main heading correctly', () => {
    render(<Benefits />);

    const heading = screen.getByRole('heading', { name: /why hisab\s*kitab\?/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders all benefit titles', () => {
    render(<Benefits />);
    benefitTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test('renders a Lottie animation for each benefit', () => {
    render(<Benefits />);
    const lottieAnimations = screen.getAllByTestId('lottie-animation');
    expect(lottieAnimations).toHaveLength(benefitTitles.length);
  });
});