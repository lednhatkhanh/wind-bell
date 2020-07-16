import React from 'react';
import clsx from 'clsx';

import { ExtendableComponentProps } from '../common';
import { FIXED_CLASS_NAME } from '../../utils';

import appBarClasses from './AppBar.module.css';

export type AppBarProps = ExtendableComponentProps<'header'>;

export const AppBar: React.FC<AppBarProps> = ({ className, children, ...rest }) => {
  return (
    <header {...rest} className={clsx(appBarClasses.appBar, FIXED_CLASS_NAME, className)}>
      {children}
    </header>
  );
};
