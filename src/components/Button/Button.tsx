import React from 'react';
import clsx from 'clsx';

import { Spinner } from '../Spinner';
import { OverridableComponentProps } from '../common';

import buttonClasses from './Button.module.css';

type BaseProps = {
  colorScheme?: 'primary' | 'default';
  ['aria-busy']?: boolean;
};
export type ButtonProps<Component extends React.ElementType = 'button'> = OverridableComponentProps<
  Component,
  BaseProps
>;
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps<'button'>>(function Button(
  {
    component,
    colorScheme = 'default',
    ['aria-busy']: ariaBusy = false,
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
    if (ariaBusy) {
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
      aria-busy={ariaBusy}
      tabIndex={ariaBusy ? -1 : tabIndex}
      onClick={handleClick}
    >
      <span className={clsx(ariaBusy && 'invisible')}>{children}</span>
      {ariaBusy && (
        <div className={buttonClasses.spinnerContainer} data-testid="spinner">
          <Spinner className={buttonClasses.spinner} />
        </div>
      )}
    </Component>
  );
}) as <Component extends React.ElementType>(
  props: ButtonProps<Component>,
) => React.ReactElement<ButtonProps<Component>>;
