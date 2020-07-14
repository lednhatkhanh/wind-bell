import React from 'react';

import { TextField } from './TextField';

export default {
  title: 'TextField',
  component: TextField,
};

export const Basic = () => <TextField id="email" type="email" placeholder="Enter your email here" label="Email" />;

export const WithErrorMessage = () => (
  <TextField
    id="email"
    type="email"
    placeholder="Enter your email here"
    label="Email"
    aria-invalid
    message="Email is required"
  />
);
