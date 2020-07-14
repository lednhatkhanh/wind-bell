import React from 'react';
import clsx from 'clsx';

import { ExtendableComponentProps } from '../../common';

import listItemIconClasses from './ListItemIcon.module.css';

export type ListItemIconProps<Component extends React.ElementType = 'div'> = ExtendableComponentProps<Component>;

export const ListItemIcon: React.FC<ListItemIconProps<'div'>> = React.forwardRef(function ListItemIcon(
  { className, children, ...rest },
  ref,
) {
  return (
    <div {...rest} className={clsx(listItemIconClasses.listItemIcon, className)} ref={ref}>
      {children}
    </div>
  );
});
