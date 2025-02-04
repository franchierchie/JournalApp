import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { Grid2, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { setActiveNote } from '../../store/journal/journalSlice';

export const SidebarItem = ({ title = '', body, id, date, imageUrls = [] }) => {
  const dispatch = useDispatch();

  const onClickNote = () => {
    dispatch( setActiveNote({ title, body, id, date, imageUrls }) );
  }

  const newTitle = useMemo(() => {
    return title.length > 20
      ? title.substring(0,20) + '...'
      : title
  }, [title]);

  const newBody = useMemo(() => {
    return body.length > 22
      ? body.substring(0,22) + '...'
      : body
  }, [body]);

  return (
    <ListItem disablePadding onClick={ onClickNote }>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>

        <Grid2 container>
          <ListItemText primary={ newTitle } />
          <ListItemText secondary={ newBody } />
        </Grid2>
      </ListItemButton>
    </ListItem>
  )
}
