import React from 'react';

import { OverridableComponentProps } from '../common';

import listClasses from './List.module.css';
import clsx from 'clsx';

export type ListProps<Component extends React.ElementType = 'button'> = OverridableComponentProps<Component>;

export const List: React.FC<ListProps<'ul'>> = React.forwardRef(function List({ className, children, ...rest }, ref) {
  return (
    <ul {...rest} className={clsx(listClasses.list, className)} ref={ref}>
      {children}
    </ul>
  );
});
