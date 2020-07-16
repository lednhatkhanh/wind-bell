import React from 'react';

import { IconButton } from './IconButton';
import { LogoutIcon } from '../../icons';

export default {
  title: 'Icon Button',
  component: IconButton,
};

export const Basic = () => (
  <IconButton>
    <LogoutIcon />
  </IconButton>
);

export const Disabled = () => (
  <IconButton disabled>
    <LogoutIcon />
  </IconButton>
);

export const LinkButton = () => (
  <IconButton component="a" href="https://example.com" target="_blank" rel="noreferrer noopener">
    <LogoutIcon />
  </IconButton>
);
