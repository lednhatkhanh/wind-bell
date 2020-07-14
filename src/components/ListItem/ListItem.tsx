import React from 'react';
import clsx from 'clsx';

import { OverridableComponentProps } from '../common';

import listItemClasses from './ListItem.module.css';

export type ListItemProps<Component extends React.ElementType = 'li'> = OverridableComponentProps<Component>;

export const ListItem: React.FC<ListItemProps<'li'>> = React.forwardRef(function ListItem(
  { className, children, tabIndex = 0, ...rest },
  ref,
) {
  return (
    <li {...rest} className={clsx(listItemClasses.listItem, className)} tabIndex={tabIndex} ref={ref}>
      {children}
    </li>
  );
});
