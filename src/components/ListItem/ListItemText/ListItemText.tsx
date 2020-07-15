import React from 'react';
import clsx from 'clsx';

import { ExtendableComponentProps } from '../../common';

import listItemTextClasses from './ListItemText.module.css';

type BaseProps = {
  isInset?: boolean;
};
export type ListItemText<Component extends React.ElementType = 'p'> = ExtendableComponentProps<Component, BaseProps>;

export const ListItemText: React.FC<ListItemText<'p'>> = React.forwardRef(function ListItemText(
  { className, children, isInset = false, ...rest },
  ref,
) {
  return (
    <div
      {...rest}
      ref={ref}
      className={clsx(
        'prose',
        'prose-sm',
        listItemTextClasses.listItemText,
        isInset && listItemTextClasses.isInset,
        className,
      )}
    >
      {children}
    </div>
  );
});
