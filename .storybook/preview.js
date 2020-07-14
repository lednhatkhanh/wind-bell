import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { addDecorator } from '@storybook/react';

import '../src/styles/index.css';

addDecorator(withA11y);
