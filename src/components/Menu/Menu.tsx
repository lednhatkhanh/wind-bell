import React from 'react';
import { usePopper } from 'react-popper';
import clsx from 'clsx';
import { Placement } from '@popperjs/core';
import { motion, AnimatePresence } from 'framer-motion';

import { OverridableComponentProps } from '../common';
import { Portal } from '../Portal';
import { List } from '../List';
import { useEnhancedEffect, useEventListener, useCycleIndex, useRefInjectedItems } from '../../hooks';

import menuClasses from './Menu.module.css';

type BaseProps = {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  onClose: () => void;
  placement?: Placement;
};
export type MenuProps = OverridableComponentProps<'ul', BaseProps>;

export const Menu: React.FC<MenuProps> = ({
  anchorEl,
  children,
  onClose,
  className,
  isOpen = false,
  placement = 'bottom-start',
  tabIndex = 0,
  ...rest
}) => {
  const { items, itemRefs } = useRefInjectedItems(children);
  const [menuRef, setMenuRef] = React.useState<HTMLUListElement | null>(null);
  const { styles, attributes } = usePopper(anchorEl, menuRef, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });
  const {
    index: hoveringIndex,
    increase: increaseHoveringIndex,
    decrease: decreaseHoveringIndex,
    setIndex: setHoveringIndex,
  } = useCycleIndex(itemRefs.current.length);

  const handleClose = React.useCallback(() => {
    if (isOpen) {
      onClose();
      anchorEl?.focus();
      setHoveringIndex(0);
    }
  }, [onClose, anchorEl, setHoveringIndex, isOpen]);

  const handleClickOutside = React.useCallback(
    (event: MouseEvent) => {
      if (!anchorEl?.contains(event.target as HTMLElement)) {
        handleClose();
      }
    },
    [anchorEl, handleClose],
  );
  useEventListener('click', handleClickOutside);

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (isOpen) {
        switch (event.key) {
          case 'ArrowDown': {
            increaseHoveringIndex();
            break;
          }
          case 'ArrowUp': {
            decreaseHoveringIndex();
            break;
          }
          case 'Enter': {
            event.preventDefault();
            const hoveringItem = itemRefs.current[hoveringIndex];
            hoveringItem?.click();
            break;
          }
          case 'Escape': {
            handleClose();
            break;
          }
          default:
            break;
        }
      }
    },
    [itemRefs, decreaseHoveringIndex, handleClose, hoveringIndex, increaseHoveringIndex, isOpen],
  );
  useEventListener('keydown', handleKeyDown);

  const handleMenuRef = (instance: HTMLUListElement | null) => {
    setMenuRef(instance);
  };

  useEnhancedEffect(() => {
    if (isOpen) {
      itemRefs.current[hoveringIndex]?.focus();
    }
  }, [isOpen, hoveringIndex, itemRefs]);

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <MotionList
            {...(rest as unknown)}
            initial={listExitAnimate}
            animate={listAnimate}
            exit={listExitAnimate}
            className={clsx(menuClasses.menu, className)}
            ref={handleMenuRef}
            style={styles.popper}
            tabIndex={tabIndex}
            {...attributes.popper}
            role="menu"
          >
            {items}
          </MotionList>
        )}
      </AnimatePresence>
    </Portal>
  );
};

const MotionList = motion.custom(List);
const listExitAnimate = { opacity: 0 };
const listAnimate = { opacity: 1 };
