import React from 'react';
import clsx from 'clsx';

import { ExtendableComponentProps } from '../common';

import toolBarClasses from './ToolBar.module.css';

export type ToolBarProps = ExtendableComponentProps<'div'>;

export const ToolBar: React.FC<ToolBarProps> = ({ className, children, ...rest }) => {
  return (
    <div {...rest} className={clsx('container', toolBarClasses.toolBar, className)}>
      {children}
    </div>
  );
};
