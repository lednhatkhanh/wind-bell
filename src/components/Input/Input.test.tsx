import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('<Input />', () => {
  test('should render common attributes', () => {
    const { getByLabelText } = render(
      <Input value="a@gmail.com" accept="email" disabled readOnly name="email" id="email" aria-label="Email" />,
    );

    const input = getByLabelText('Email');

    expect(input).toHaveAttribute('id', 'email');
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('readOnly', '');
    expect(input).toHaveAttribute('accept', 'email');
  });

  test('should render full width input', () => {
    const { getByLabelText } = render(<Input fullWidth aria-label="Full width" />);

    expect(getByLabelText('Full width')).toHaveClass('isFullWidth');
  });

  test('should call onChange', () => {
    let value = '';
    const onChange = jest.fn().mockImplementationOnce((event) => {
      value = event.target.value;
    });
    const { getByLabelText } = render(<Input aria-label="Sample input" onChange={onChange} />);

    const input = getByLabelText('Sample input');
    fireEvent.change(input, { target: { value: '12333' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(value).toStrictEqual('12333');
  });

  test('should call onKey* events', () => {
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();
    const onKeyPress = jest.fn();
    const { getByLabelText } = render(
      <Input onKeyDown={onKeyDown} onKeyUp={onKeyUp} onKeyPress={onKeyPress} aria-label="Events input" />,
    );

    const input = getByLabelText('Events input');

    fireEvent.keyDown(input, { key: 'A', code: 'KeyA' });
    expect(onKeyDown).toHaveBeenCalledTimes(1);

    fireEvent.keyUp(input, { key: 'A', code: 'KeyA' });
    expect(onKeyUp).toHaveBeenCalledTimes(1);

    fireEvent.keyPress(input, { key: 'A', code: 'KeyA', charCode: 13 });
    expect(onKeyPress).toHaveBeenCalledTimes(1);
  });
});
