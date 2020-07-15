import React from 'react';
import clsx from 'clsx';

import { OverridableComponentProps } from '../common';

import listItemClasses from './ListItem.module.css';

type BaseProps = {
  hasDivider?: boolean;
};
export type ListItemProps<Component extends React.ElementType = 'li'> = OverridableComponentProps<Component, BaseProps>;

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps<'li'>>(function ListItem(
  { className, children, tabIndex = 0, hasDivider, component, ...rest },
  ref,
) {
  const Component = component ?? 'li';
  return (
    <Component
      {...rest}
      className={clsx(listItemClasses.listItem, hasDivider && listItemClasses.hasDivider, className)}
      tabIndex={tabIndex}
      ref={ref}
    >
      {children}
    </Component>
  );
}) as <Component extends React.ElementType = 'li'>(
  props: ListItemProps<Component>,
) => React.ReactElement<ListItemProps<Component>>;
