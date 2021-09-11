import clsx from 'clsx'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Box, Drawer, Hidden, SwipeableDrawer, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ProjectTree from '../features/ProjectTree/ProjectTree'
import Dashboard from './Dashboard'
import TaskList from './TaskList'
import AppBar from '../features/AppBar'
import { useAtom } from 'jotai'
import { drawerState } from '../state'
import React from 'react'
import { useIsMobile } from '../utils'

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

    [theme.breakpoints.down('sm')]: {
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
  const isMobile = useIsMobile()
  const [drawer, setDrawer] = useAtom(drawerState)

  return (
    <Router>
      <AppBar />

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
        <Hidden smDown>
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
  );
}
