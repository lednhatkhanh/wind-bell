import React from 'react';
import { ListItemProps, ListItem } from '../../ListItem';

export const MenuItem = React.forwardRef<HTMLLIElement, ListItemProps<'li'>>(function MenuItem(
  { children, role = 'menuitem', ...rest },
  ref,
) {
  return (
    <ListItem {...rest} ref={ref} role={role}>
      {children}
    </ListItem>
  );
}) as <Component extends React.ElementType = 'li'>(
  props: ListItemProps<Component>,
) => React.ReactElement<ListItemProps<Component>>;
