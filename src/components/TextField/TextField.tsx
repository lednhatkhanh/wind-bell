import React from 'react';

import { ExtendableComponentProps } from '../common';
import { Input, InputProps } from '../Input';
import { FormControl } from '../FormControl';
import { Label, LabelProps } from '../Label';
import { FieldMessage, FieldMessageProps } from '../FieldMessage';

type BaseProps = Pick<
  React.ComponentPropsWithRef<typeof Input>,
  'value' | 'onChange' | 'aria-invalid' | 'name' | 'type' | 'required' | 'defaultValue'
> & {
  inputRef?: React.ComponentPropsWithRef<typeof Input>['ref'];
  label?: React.ReactNode;
  message?: string;
  id: string;
  Input?: InputProps;
  Label?: LabelProps;
  FieldMessage?: FieldMessageProps;
};

export type TextFieldProps = ExtendableComponentProps<'div', BaseProps>;

export const TextField: React.FC<TextFieldProps> = React.forwardRef(function FormField(
  {
    inputRef,
    value,
    ['aria-invalid']: ariaInvalid,
    id,
    name,
    required,
    type,
    label,
    message,
    onChange,
    placeholder,
    defaultValue,
    Input: inputProps = {},
    Label: labelProps = {},
    FieldMessage: fieldMessageProps = {},
    ...rest
  },
  ref,
) {
  const messageId = message ? `${id}-message` : undefined;

  return (
    <FormControl {...rest} ref={ref}>
      <Label htmlFor={id} {...labelProps}>
        {label}
      </Label>

      <Input
        ref={inputRef}
        id={id}
        name={name}
        value={value}
        type={type}
        required={required}
        placeholder={placeholder}
        aria-invalid={ariaInvalid}
        aria-describedby={messageId}
        defaultValue={defaultValue}
        onChange={onChange}
        {...inputProps}
      />

      {message && (
        <FieldMessage id={messageId} isError={!!ariaInvalid} {...fieldMessageProps}>
          {message}
        </FieldMessage>
      )}
    </FormControl>
  );
});
