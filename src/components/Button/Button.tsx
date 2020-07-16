import React from 'react';
import clsx from 'clsx';

import { Spinner } from '../Spinner';
import { OverridableComponentProps } from '../common';

import buttonClasses from './Button.module.css';

type BaseProps = {
  colorScheme?: 'primary' | 'default';
  loading?: boolean;
};
export type ButtonProps<Component extends React.ElementType = 'button'> = OverridableComponentProps<
  Component,
  BaseProps
>;
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps<'button'>>(function Button(
  {
    component,
    colorScheme = 'default',
    loading = false,
    disabled = false,
    className,
    children,
    onClick,
    tabIndex,
    ...rest
  },
  ref,
) {
  const Component = component ?? 'button';
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Component
      {...rest}
      ref={ref}
      className={clsx(
        buttonClasses.button,
        { default: buttonClasses.isDefault, primary: buttonClasses.isPrimary }[colorScheme],
        className,
      )}
      aria-busy={loading}
      aria-disabled={disabled}
      disabled={disabled}
      tabIndex={loading ? -1 : tabIndex}
      onClick={handleClick}
    >
      <span className={clsx(loading && 'invisible')}>{children}</span>
      {loading && (
        <div className={buttonClasses.spinnerContainer} data-testid="spinner">
          <Spinner className={buttonClasses.spinner} />
        </div>
      )}
    </Component>
  );
}) as <Component extends React.ElementType>(
  props: ButtonProps<Component>,
) => React.ReactElement<ButtonProps<Component>>;
