import React from 'react';
import clsx from 'clsx';

import { ExtendableComponentProps } from '../../common';

export type ListItemText<Component extends React.ElementType = 'p'> = ExtendableComponentProps<Component>;

export const ListItemText: React.FC<ListItemText<'p'>> = React.forwardRef(function ListItemText(
  { className, children, ...rest },
  ref,
) {
  return (
    <div {...rest} ref={ref} className={clsx('prose', 'prose-sm', className)}>
      {children}
    </div>
  );
});
