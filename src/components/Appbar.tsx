import {
  AppBar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
  Link,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useIsLightModeOn } from '../theme/MyThemeProvider';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
// import { ProfileButton } from './ProfileButton'
import { SwitchThemeButton } from './SwitchThemeButton';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';

export const Appbar = () => {
  const theme = useTheme();
  const isLightModeOn = useIsLightModeOn();

  const [state, setState] = useState(false);

  const toggleDrawer = (event: React.MouseEvent | React.KeyboardEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState((prevState) => !prevState);
  };

  const DrawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={(e: React.MouseEvent) => {
        toggleDrawer(e);
      }}
      onKeyDown={(e: React.KeyboardEvent) => {
        toggleDrawer(e);
      }}
    >
      <List>
        <Link href="/" color="inherit" underline="none">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'App'} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link href="/about" color="inherit" underline="none">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={'Informações'} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ boxShadow: 'none' }}>
          <Toolbar sx={isLightModeOn ? { backgroundColor: '#FFFFFFFF', color: grey[900] } : undefined}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'row' }}>
              <Typography sx={{ color: theme.palette.text.primary }} variant="h6" component="div">
                Universos de Arte
              </Typography>
            </Box>
            <SwitchThemeButton />
            {/* <ProfileButton /> */}
          </Toolbar>
        </AppBar>
      </Box>
      <SwipeableDrawer open={state} onClose={toggleDrawer} onOpen={toggleDrawer}>
        <DrawerList />
      </SwipeableDrawer>
    </>
  );
};
