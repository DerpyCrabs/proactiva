import clsx from 'clsx'
import { useState } from 'react'
import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import {
  AppBar,
  Box,
  Drawer,
  Hidden,
  IconButton,
  SwipeableDrawer,
  Theme,
  Toolbar,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import MenuIcon from '@material-ui/icons/Menu'
import ProjectTree from '../features/ProjectTree/ProjectTree'
import Dashboard from './Dashboard'
import TaskList from './TaskList'

const drawerWidth = '300px'

interface StyleProps {
  drawerWidth: string
}

const useStyles = makeStyles((theme: Theme) => ({
  appbar: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 15%)',
  },

  //  drawer: (props) => ({}),
  drawerPaper: {
    zIndex: theme.zIndex.appBar - 1,
  },

  main: {
    overflowY: 'auto',
    flexGrow: 1,
    marginTop: '64px',
    height: 'calc(100vh - 64px)',

    [theme.breakpoints.down('xs')]: {
      marginTop: '48px',
      height: 'calc(100vh - 48px)',
    },

    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  mainShift: (props: StyleProps) => ({
    marginLeft: props.drawerWidth,

    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export default function Index() {
  const classes = useStyles({ drawerWidth })
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))
  const [drawer, setDrawer] = useState(!isMobile)

  return (
    <Router>
      <AppBar className={classes.appbar} position='fixed' elevation={1}>
        <Toolbar>
          <IconButton
            size={isMobile ? 'small' : 'medium'}
            onClick={() => setDrawer((prev) => !prev)}
          >
            {isMobile && drawer ? (
              <CloseIcon fontSize={isMobile ? 'small' : 'default'} />
            ) : (
              <MenuIcon fontSize={isMobile ? 'small' : 'default'} />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box display='flex'>
        {/* Drawer for mobile */}
        <Hidden smUp>
          <SwipeableDrawer
            open={drawer}
            onClose={() => setDrawer(false)}
            onOpen={() => setDrawer(true)}
            // swipeAreaWidth={100}
            SwipeAreaProps={{ style: { top: '48px', width: '32px' } }}
            ModalProps={{
              style: { zIndex: 1099 },
              disablePortal: true,
              keepMounted: true,
            }}
          >
            <ProjectTree />
          </SwipeableDrawer>
        </Hidden>

        {/* Drawer for tablet, desktop */}
        <Hidden xsDown>
          <Drawer
            variant='persistent'
            open={drawer}
            classes={{ paper: classes.drawerPaper }}
          >
            <ProjectTree />
          </Drawer>
        </Hidden>

        <main
          className={clsx(classes.main, {
            [classes.mainShift]: drawer && !isMobile,
          })}
        >
          <Switch>
            <Route exact path='/' children={<Dashboard />} />
            <Route path='/:id' children={<TaskList />} />
          </Switch>
        </main>
      </Box>
    </Router>
  )
}
