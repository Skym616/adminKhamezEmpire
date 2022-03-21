import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';
import drawerItem from './DrawerItem';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Contexts/AuthContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: { width: drawerWidth },
  drawerPaper: { width: drawerWidth },
  appbar: {
    width: { lg: `calc(100% - ${drawerWidth}px)`, xs: '100%' }
  },
  toolbar: theme.mixins.toolbar,
  active: {
    backgroundColor: 'rgba(10, 25, 41, 0.7)'
  }
}));

const Layout = () => {
  const AuthContext = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const classes = useStyles();


  return (
    <Container>
      <AppBar
        className={classes.appbar}
        elevation={1}
        sx={{ backgroundColor: '#0A1929' }}
      >
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='primary'
            aria-label='menu'
            sx={{ mr: 2, display: { xs: 'block', lg: 'none' } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            color='#ffffff'
            sx={{ flexGrow: 1, textAlign: 'center' }}
          >
            Khamez Empire Amdnistration
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        open={true}
        anchor='left'
        variant='permanent'
        onClose={() => {
        }}
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
        sx={{ display: { xs: 'none', lg: 'block' } }}
      >
        <Box sx={{ height: '100%', backgroundColor: '#0A1929' }}>
          <Typography
            variant='h4'
            component='div'
            sx={{ textAlign: 'center', padding: '10px', color: '#ffffff' }}
          >
            Mr penne
          </Typography>
          <Divider />
          <List>
            {drawerItem.map((item) => (
              <ListItem
                onClick={() => navigate(item.path)}
                button
                key={item.id}
                className={
                  location.pathname === item.path ? classes.active : null
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText sx={{ cursor: 'pointer' }}>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component={Box}
                    fontWeight='fontWeightBold'
                    sx={{ color: '#ffffff' }}
                  >
                    {item.text}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Drawer
        open={open}
        anchor='left'
        onClose={() => {
        }}
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
        sx={{ display: { xs: 'block', lg: 'none' } }}
        onClick={() => setOpen(false)}
      >
        <Box sx={{ height: '100%', backgroundColor: '#0A1929' }}>
          <IconButton
            size='large'
            edge='start'
            color='primary'
            aria-label='open drawer'
            sx={{
              marginLeft: 'auto',
              marginRight: 'auto',
              display: { xs: 'block', lg: 'block' },
              backgroundColor: '#fe4c50',
              marginTop: '20px'
            }}
            onClick={() => setOpen(false)}
          >
            <ChevronLeft />
          </IconButton>
          <Divider />
          <List>
            {drawerItem.map((item) => (
              <ListItem button onClick={() => navigate(item.path)} sx={{ color: '#ffffff' }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText sx={{ cursor: 'pointer' }}>
                  {item.text}
                </ListItemText>
              </ListItem>
            ))}
            <ListItem>
              <Button variant={'outlined'} onClick={() => {
                window.sessionStorage.removeItem('user');
                AuthContext.update();
                navigate('/login');
              }}>
                Log Out
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <div className={classes.toolbar}>
        <Outlet />
      </div>
    </Container>
  )
    ;
};

export default Layout;
