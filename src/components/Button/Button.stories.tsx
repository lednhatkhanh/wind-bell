/** @jsx jsx */
import { jsx } from '@emotion/core';
import { css } from '@emotion/react';

import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
};

export const Basic = () => <Button>Hello World</Button>;

export const Colors = () => (
  <div
    css={css({
      display: 'grid',
      gridAutoFlow: 'column',
      gridAutoColumns: 'max-content',
      justifyItems: 'start',
      gridGap: '1rem',
    })}
  >
    <Button>Default</Button>
    <Button colorScheme="primary">Primary</Button>
  </div>
);

export const Disabled = () => <Button disabled>Disabled</Button>;

export const Loading = () => (
  <div
    css={css({
      display: 'grid',
      gridAutoFlow: 'column',
      gridAutoColumns: 'max-content',
      justifyItems: 'start',
      gridGap: '1rem',
    })}
  >
    <Button aria-busy>Loading</Button>
    <Button colorScheme="primary" aria-busy>
      Loading
    </Button>
  </div>
);

export const LinkButton = () => (
  <div>
    <Button component="a" href="https://example.com" target="_blank" rel="noreferrer noopener">
      Example.com
    </Button>
  </div>
);
