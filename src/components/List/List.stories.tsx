import React from 'react';
import { List } from './List';
import { ListItem, ListItemIcon, ListItemText } from '../ListItem';
import { CheckIcon, UserIcon, TrelloIcon } from '../../icons';

export default {
  title: 'List',
  component: List,
};

export const Basic = () => (
  <List>
    <ListItem>
      <ListItemIcon>
        <CheckIcon />
      </ListItemIcon>
      <ListItemText>Item 1</ListItemText>
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <UserIcon />
      </ListItemIcon>
      <ListItemText>Item 2</ListItemText>
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <TrelloIcon />
      </ListItemIcon>
      <ListItemText>Item 3</ListItemText>
    </ListItem>
  </List>
);
