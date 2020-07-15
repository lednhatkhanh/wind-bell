import React from 'react';
import { Menu } from './Menu';
import { ListItemText, ListItemIcon } from '../ListItem';
import { Button } from '../Button';
import { UserIcon } from '../../icons';
import { MenuItem } from './MenuItem';

export default {
  title: 'Menu',
  component: Menu,
};

export const Basic = () => {
  const [buttonRef, setButtonRef] = React.useState<HTMLButtonElement | null>(null);

  const handleToggleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setButtonRef((currentButtonRef) => (!currentButtonRef ? event.currentTarget : null));
  };

  const handleCloseMenu = () => {
    setButtonRef(null);
  };

  return (
    <>
      <Button onClick={handleToggleOpenMenu} aria-haspopup aria-expanded={!!buttonRef}>
        Toggle open menu
      </Button>

      <Menu isOpen={!!buttonRef} anchorEl={buttonRef} onClose={handleCloseMenu}>
        <MenuItem
          onClick={() => {
            console.log('what');
          }}
        >
          <ListItemText isInset>Hello world!</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            console.log('what1');
          }}
        >
          <ListItemText isInset>
            Menu item with very very long text that will overflow from its parent for sure
          </ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            console.log('with-icon');
          }}
        >
          <ListItemIcon>
            <UserIcon />
          </ListItemIcon>
          <ListItemText>Menu item with very very long text that will overflow from its parent for sure</ListItemText>
        </MenuItem>

        <MenuItem component="a" href="https://example.com" target="_blank" rel="noreferrer noopener">
          <ListItemText isInset>example.com</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
