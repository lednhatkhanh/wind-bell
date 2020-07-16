import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('<Button />', () => {
  test('should render children', () => {
    const { container } = render(<Button>Hello World</Button>);
    expect(container).toHaveTextContent('Hello World');
  });

  test('should render common props', () => {
    const { getByText } = render(
      <Button type="button" className="custom-class" style={{ color: 'blue' }}>
        Hello World
      </Button>,
    );

    const button = getByText('Hello World').closest('button');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveStyle('color:blue;');
  });

  test('should render loading button', () => {
    const onClick = jest.fn();
    const { getByText, getByTestId } = render(
      <Button loading onClick={onClick}>
        Loading button
      </Button>,
    );

    const childrenSpan = getByText('Loading button');
    getByTestId('spinner');

    const button = childrenSpan.closest('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('tabIndex', '-1');

    expect(childrenSpan).toHaveClass('invisible');

    fireEvent.click(childrenSpan);
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  test('should render disabled button', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Button disabled onClick={onClick}>
        Disabled button
      </Button>,
    );

    const childSpan = getByText('Disabled button');
    const button = childSpan.closest('button');

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');

    fireEvent.click(childSpan);
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  test('should trigger onClick event', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Event button</Button>);

    const button = getByText('Event button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('should render button as a anchor tag', () => {
    const { getByText } = render(
      <Button component="a" href="https://example.com" rel="noreferrer noopener" target="_blank">
        Example.com
      </Button>,
    );

    const linkButton = getByText('Example.com').closest('a');
    expect(linkButton).toHaveAttribute('href', 'https://example.com');
    expect(linkButton).toHaveAttribute('rel', 'noreferrer noopener');
    expect(linkButton).toHaveAttribute('target', '_blank');
  });
});
