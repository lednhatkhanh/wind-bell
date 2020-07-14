import React from 'react';
import { ColorPicker } from './ColorPicker';

export default {
  title: 'ColorPicker',
  component: ColorPicker,
};

export const Basic = () => {
  const [color, setColor] = React.useState<string | undefined>(undefined);

  return (
    <div className="w-64">
      <ColorPicker
        label="Background color"
        colors={['#E53E3E', '#DD6B20', '#D69E2E', '#38A169', '#319795', '#3182CE', '#5A67D8', '#805AD5', '#D53F8C']}
        value={color}
        onChange={setColor}
      />
    </div>
  );
};
