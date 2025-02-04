import { useSelector } from 'react-redux';

import { Box, Divider, Drawer, List, Toolbar, Typography, useMediaQuery } from '@mui/material';

import { SidebarItem } from './';


export const Sidebar = ({ drawerWidth = 240, isOpen, closeDrawer }) => {
  const { displayName } = useSelector(state => state.auth);
  const { notes } = useSelector(state => state.journal);
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      onClick={ closeDrawer }
    >
      <Drawer
        variant={ isDesktop ? "permanent" : "temporary" }
        open={ isDesktop ? true : isOpen }
        onClose={ !isDesktop ? closeDrawer : undefined }
        // ModalProps={{
        //   onBackdropClick: closeDrawer,
        // }}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="p">
            { displayName }
          </Typography>
        </Toolbar>

        <Divider />

        <List>
          {
            notes.map(note => (
              <SidebarItem key={ note.id } { ...note } />
            ))
          }
        </List>
      </Drawer>
    </Box>
  )
}
