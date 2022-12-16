import {
  AppBar, Box, Divider, IconButton, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Toolbar, Typography, Link
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { useIsLightModeOn } from '../theme/MyThemeProvider'
import { useTheme } from '@mui/material/styles'
import React, { useState } from 'react'

import { ProfileButton } from './ProfileButton'
import { SwitchThemeButton } from './SwitchThemeButton'
import MenuIcon from '@mui/icons-material/Menu'
import InfoIcon from '@mui/icons-material/Info';
import InboxIcon from '@mui/icons-material/Inbox'
import MailIcon from '@mui/icons-material/Mail'
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work'; 
import PhoneIcon from '@mui/icons-material/Phone';

export const Appbar : Function = () => {
  const theme = useTheme();
  const isLightModeOn = useIsLightModeOn();

  const [state, setState] = useState(false);

  const toggleDrawer = (event : any) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState((prevState) => !prevState);
  };

  const DrawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={(e) => { toggleDrawer(e) }}
      onKeyDown={(e) => { toggleDrawer(e) }}
    >
      <List>

        <Link href='/' color='inherit' underline='none'>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href='/vagas' color='inherit' underline='none'>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary={'Vagas'} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        {['Contato', 'Sobre'].map((text, index) => (
          <Link key={text} href='/' color='inherit' underline='none'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {text === 'Sobre' && <InfoIcon />}
                  {text === 'Contato' && <PhoneIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
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
                Portal - Vagas SCI
              </Typography>
            </Box>
            <SwitchThemeButton />
            <ProfileButton />
          </Toolbar>
        </AppBar>
      </Box>
      <SwipeableDrawer
        open={state}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <DrawerList />
      </SwipeableDrawer>
    </>
  )
}