import { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Navbar, Sidebar } from '../components';

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false);

  // They are separated on purpose. Leave openDrawer and closeDrawer separated because otherwise, it won't work
  const openDrawer = () => {
    setIsOpen( true );
  }

  const closeDrawer = () => {
    setIsOpen( false );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar
        openDrawer={ openDrawer }
        drawerWidth={ drawerWidth }
      />

      <Sidebar
        isOpen={ isOpen }
        closeDrawer={ closeDrawer }
        drawerWidth={ drawerWidth }
      />

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Toolbar />

        { children }
      </Box>
    </Box>
  )
}
