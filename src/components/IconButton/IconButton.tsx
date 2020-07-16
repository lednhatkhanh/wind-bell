import React from 'react';
import clsx from 'clsx';

import { OverridableComponentProps } from '../common';

import iconButtonClasses from './IconButton.module.css';

export type IconButtonProps<Component extends React.ElementType = 'button'> = OverridableComponentProps<Component>;
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps<'button'>>(function Button(
  { component, disabled = false, className, children, onClick, ...rest },
  ref,
) {
  const Component = component ?? 'button';
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Component
      {...rest}
      ref={ref}
      className={clsx(iconButtonClasses.iconButton, className)}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </Component>
  );
}) as <Component extends React.ElementType>(
  props: IconButtonProps<Component>,
) => React.ReactElement<IconButtonProps<Component>>;
