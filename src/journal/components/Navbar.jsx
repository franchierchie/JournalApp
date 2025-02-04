import { useDispatch } from 'react-redux';
import { startLogOut } from '../../store/auth/thunks';

import { AppBar, Grid2, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';

export const Navbar = ({ drawerWidth, openDrawer }) => {
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch( startLogOut() );
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${ drawerWidth }px)` },
        ml: { sm: `${ drawerWidth }px` }
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={ openDrawer }
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid2 
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ flexGrow: 1 }}
        >
          <Typography variant="h6" noWrap component="p">JournalApp</Typography>

          <IconButton
            color="error"
            onClick={ onLogOut }
          >
            <LogoutOutlined />
          </IconButton>
        </Grid2>
      </Toolbar>
    </AppBar>
  )
}
