import React from 'react';
import clsx from 'clsx';

import { ExtendableComponentProps } from '../common';
import { Label } from '../Label';

import colorPickerClasses from './ColorPicker.module.css';
import { ColorItem } from './ColorItem';

type BaseProps = {
  colors: string[];
  label: string;
  value?: string;
  onChange?: (value: string) => void;
};
export type ColorPickerProps = ExtendableComponentProps<'div', BaseProps>;

export const ColorPicker: React.FC<ColorPickerProps> = React.forwardRef(function ColorsPicker(
  { label, colors = [], value, onChange, className, ...rest },
  ref,
) {
  const handleColorChange = (color: string) => {
    if (onChange) {
      onChange(color);
    }
  };

  return (
    <div {...rest} className={clsx(colorPickerClasses.colorPicker, className)} ref={ref}>
      <Label>{label}</Label>
      <div className={colorPickerClasses.colorItems}>
        {colors.map((color) => (
          <ColorItem
            key={color}
            className={colorPickerClasses.color}
            aria-label={color}
            color={color}
            selected={color === value}
            onClick={handleColorChange}
          />
        ))}
      </div>
    </div>
  );
});
