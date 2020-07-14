import React from 'react';
import clsx from 'clsx';

import { CheckIcon } from '../../../icons';
import { ExtendableComponentProps } from '../../common';

import colorItemClasses from './ColorItem.module.css';

type BaseProps = { color: string; selected: boolean; onClick: (color: string) => void };
export type ColorItemProps = ExtendableComponentProps<'button', BaseProps>;

export const ColorItem: React.FC<ColorItemProps> = React.forwardRef(function ColorItem(
  { color, onClick, className, selected, style = {}, ['aria-label']: ariaLabel, type = 'button', ...rest },
  ref,
) {
  const memoStyle = React.useMemo(() => ({ background: color, ...style }), [style, color]);

  const handleClick = () => {
    onClick(color);
  };

  return (
    <button
      {...rest}
      ref={ref}
      className={clsx(colorItemClasses.colorItem, className)}
      style={memoStyle}
      aria-label={color ?? ariaLabel}
      type={type}
      onClick={handleClick}
    >
      {selected && <CheckIcon className={colorItemClasses.checkIcon} />}
    </button>
  );
});
