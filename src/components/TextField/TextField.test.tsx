import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { TextField } from './TextField';

describe('<TextField />', () => {
  test('should render common input props', () => {
    const { getByLabelText, getByText } = render(
      <TextField
        id="email"
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        defaultValue="abc@example.com"
        required
      />,
    );

    const input = getByLabelText('Email');
    const label = getByText('Email');

    expect(input).toHaveValue('abc@example.com');
    expect(input).toHaveAttribute('id', 'email');
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'Enter your email');
    expect(input).toBeRequired();

    expect(label).toHaveAttribute('for', 'email');
  });

  test('should render field message', () => {
    const { getByText } = render(<TextField id="email" message="Email is required" />);

    const message = getByText('Email is required');
    expect(message).toHaveAttribute('id', 'email-message');
  });

  test('should render error', () => {
    const { getByText, getByPlaceholderText } = render(
      <TextField id="email" message="Email is required" placeholder="Enter email here" aria-invalid />,
    );

    getByText('Email is required');
    const input = getByPlaceholderText('Enter email here');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'email-message');
  });

  test('should render custom Input props', () => {
    const { getByPlaceholderText } = render(
      <TextField id="password" Input={{ className: 'custom-input-class', placeholder: 'Enter password here' }} />,
    );

    expect(getByPlaceholderText('Enter password here')).toHaveClass('custom-input-class');
  });

  test('should render custom Label props', () => {
    const { getByText } = render(
      <TextField id="password" Label={{ className: 'custom-label-class' }} label="Password" />,
    );

    expect(getByText('Password')).toHaveClass('custom-label-class');
  });

  test('should render custom message props', () => {
    const { getByText } = render(
      <TextField id="password" message="Invalid password" FieldMessage={{ className: 'password-custom-class' }} />,
    );

    expect(getByText('Invalid password')).toHaveClass('password-custom-class');
  });

  test('should trigger onChange event', () => {
    let value = '';
    const onChange = jest.fn().mockImplementationOnce((event) => {
      value = event.target.value;
    });

    const { getByLabelText } = render(<TextField id="password" label="Sample input" onChange={onChange} />);

    const input = getByLabelText('Sample input');
    fireEvent.change(input, { target: { value: '12333' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(value).toStrictEqual('12333');
  });
});
