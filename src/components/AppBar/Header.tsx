import React from 'react';
import clsx from 'clsx';

import { ExtendableComponentProps } from '../common';

import appBarClasses from './AppBar.module.css';

export type AppBarProps = ExtendableComponentProps<'header'>;

export const AppBar: React.FC<AppBarProps> = ({ className, children, ...rest }) => {
  return (
    <header {...rest} className={clsx(appBarClasses.appBar, className)}>
      {children}
    </header>
  );
};
