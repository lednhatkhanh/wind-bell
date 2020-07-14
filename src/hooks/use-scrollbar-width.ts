import React from 'react';
import { useEnhancedEffect } from './use-enhanced-effect';

export const useScrollbarWidth = (): number => {
  const [scrollBarWidth, setScrollBarWidth] = React.useState(0);

  useEnhancedEffect(() => {
    const domNode = document.createElement('div');

    domNode.style.position = 'absolute';
    domNode.style.top = '-9999px';
    domNode.style.height = '100px';
    domNode.style.width = '100px';
    domNode.style.overflow = 'scroll';

    document.body.appendChild(domNode);

    setScrollBarWidth(domNode.offsetWidth - domNode.clientWidth);
    document.body.removeChild(domNode);
  }, []);

  return scrollBarWidth;
};
