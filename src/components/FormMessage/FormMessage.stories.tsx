/** @jsx jsx */
import { jsx } from '@emotion/core';
import { css } from '@emotion/react';

import { FormMessage } from './FormMessage';

export default {
  title: 'FormMessage',
  component: FormMessage,
};

export const Variants = () => (
  <div css={css({ display: 'grid', gridAutoFlow: 'row', gridGap: '2rem', width: 300 })}>
    <FormMessage variant="info">Wrong email address</FormMessage>
    <FormMessage variant="success">Wrong email address</FormMessage>
    <FormMessage variant="warning">Wrong email address</FormMessage>
    <FormMessage variant="error">Wrong email address</FormMessage>
  </div>
);
