import React from 'react';
import ReactDOM from 'react-dom';

import { useEnhancedEffect } from '../../hooks';

export type PortalProps = {
  children: React.ReactNode;
};

export const Portal: React.FC<PortalProps> = ({ children }) => {
  const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);

  useEnhancedEffect(() => {
    if (typeof window !== 'undefined' && !mountNode) {
      const newDiv = document.createElement('div');
      document.body.appendChild(newDiv);

      setMountNode(newDiv);
    }

    return () => {
      if (typeof window !== 'undefined' && mountNode) {
        mountNode.parentElement?.removeChild(mountNode);
        setMountNode(null);
      }
    };
  }, [mountNode]);

  return mountNode && ReactDOM.createPortal(children, mountNode);
};
