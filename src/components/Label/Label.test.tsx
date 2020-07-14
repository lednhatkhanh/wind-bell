import React from 'react';
import { render } from '@testing-library/react';
import { Label } from './Label';

describe('<Label />', () => {
  test('should render common attributes', () => {
    const { container } = render(<Label htmlFor="email">Email</Label>);

    expect(container.firstChild).toHaveTextContent('Email');
    expect(container.firstChild).toHaveAttribute('for', 'email');
  });
});
