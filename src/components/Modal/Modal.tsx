import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useScrollbarWidth, useEnhancedEffect } from '../../hooks';
import { ExtendableComponentProps } from '../common';
import { Portal } from '../Portal';
import { ModalOverlay } from './ModalOverlay';
import { ModalContent } from './ModalContent';

type BaseProps = {
  'aria-labelledby': string;
  isOpen: boolean;
  onClose: () => void;
};
export type ModalProps = ExtendableComponentProps<'div', BaseProps>;

export const Modal: React.FC<ModalProps> = ({
  children,
  ['aria-labelledby']: ariaLabelledBy,
  isOpen,
  onClose,
  className,
  ...rest
}) => {
  const scrollBarWidth = useScrollbarWidth();
  const modalContentRef = React.useRef<HTMLDivElement | null>(null);
  const [animationCompleted, setAnimationCompleted] = React.useState(false);

  const handleClose = React.useCallback(() => {
    onClose();
    setAnimationCompleted(false);
  }, [onClose]);

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    },
    [handleClose, isOpen],
  );

  const handleClickOutside = React.useCallback(
    (event: MouseEvent) => {
      if (
        isOpen &&
        animationCompleted &&
        event.target &&
        !modalContentRef.current?.contains(event.target as HTMLElement)
      ) {
        handleClose();
      }
    },
    [isOpen, animationCompleted, handleClose],
  );

  const handleAnimationComplete = React.useCallback(() => {
    setAnimationCompleted(true);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      setAnimationCompleted(false);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('click', handleClickOutside);
      }
    };
  }, [handleClickOutside, handleKeyDown]);

  useEnhancedEffect(() => {
    if (typeof window !== 'undefined') {
      const hasScrollbar = document.body.scrollHeight > document.body.offsetHeight;

      if (!hasScrollbar) {
        return;
      }

      if (isOpen) {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollBarWidth}px`;

        modalContentRef.current?.focus();
      } else {
        document.body.classList.remove('overflow-hidden');
        document.body.style.paddingRight = '0px';
        document.body.style.overflow = 'auto';
      }
    }
  }, [isOpen, scrollBarWidth]);

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <MotionModalOverlay
            initial={overlayExitAnimate}
            animate={overlayAnimate}
            exit={overlayExitAnimate}
            {...(rest as unknown)}
            onAnimationComplete={handleAnimationComplete}
            className={className}
          >
            <MotionModalContent
              initial={contentExitAnimate}
              animate={contentAnimate}
              exit={contentExitAnimate}
              ref={modalContentRef}
              aria-labelledby={ariaLabelledBy}
            >
              {children}
            </MotionModalContent>
          </MotionModalOverlay>
        )}
      </AnimatePresence>
    </Portal>
  );
};

const MotionModalOverlay = motion.custom(ModalOverlay);
const MotionModalContent = motion.custom(ModalContent);

const overlayExitAnimate = { background: 'rgba(0, 0, 0, 0)' };
const overlayAnimate = { background: 'rgba(0, 0, 0, 0.75)' };
const contentAnimate = { scale: 1 };
const contentExitAnimate = { scale: 0 };
