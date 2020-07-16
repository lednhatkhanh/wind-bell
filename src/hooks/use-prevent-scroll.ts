import React from 'react';

import { FIXED_CLASS_NAME } from '../utils';

import { useScrollbarWidth } from './use-scrollbar-width';
import { useEnhancedEffect } from './use-enhanced-effect';

export const usePreventScroll = (condition: boolean) => {
  const scrollBarWidth = useScrollbarWidth();
  const originalPaddingRight = React.useRef<Map<HTMLElement, number>>(new Map());

  useEnhancedEffect(() => {
    if (typeof window !== 'undefined') {
      const hasScrollbar = window.innerHeight < document.body.scrollHeight;
      if (!hasScrollbar) {
        return;
      }

      const fixedNodes = document.querySelectorAll(`.${FIXED_CLASS_NAME}`);

      if (condition) {
        const bodyPaddingRight = parseInt(document.body.style.paddingRight);
        document.body.classList.add('overflow-hidden');
        document.body.style.paddingRight = `${scrollBarWidth + bodyPaddingRight}px`;
        originalPaddingRight.current.set(document.body, bodyPaddingRight);

        fixedNodes.forEach((node) => {
          const nodePaddingRight = parseInt((node as HTMLElement).style.paddingRight);
          (node as HTMLElement).style.paddingRight = `${scrollBarWidth + nodePaddingRight}px`;
          originalPaddingRight.current.set(node as HTMLElement, nodePaddingRight);
        });
      } else {
        document.body.classList.remove('overflow-hidden');
        document.body.style.paddingRight = `${originalPaddingRight.current.get(document.body) ?? 0}px`;

        fixedNodes.forEach((node) => {
          (node as HTMLElement).style.paddingRight = `${originalPaddingRight.current.get(document.body) ?? 0}px`;
        });
        originalPaddingRight.current = new Map();
      }
    }
  }, [scrollBarWidth, condition]);
};
