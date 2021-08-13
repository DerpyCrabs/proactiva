import { Toolbar, IconButton, AppBar as MuiAppBar, Theme, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import { useEffect } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import MenuIcon from '@material-ui/icons/Menu'
import { drawerState, usePageTitle } from '../../state'
import { useAtom } from 'jotai'
import React from 'react'
import SyncState from './SyncState'
import { NavLink } from 'react-router-dom'
import { useIsMobile } from '../../utils'

const useStyles = makeStyles((theme: Theme) => ({
  appbar: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 15%)',
  },
  pageName: {
    flexGrow: 1,
    textAlign: 'center',
    paddingLeft: '150px',
    color: '#999',
    fontWeight: 'bold',
    fontSize: '1.3rem',
  },
}))

export default function AppBar() {
  const classes = useStyles()
  const isMobile = useIsMobile()
  const [drawer, setDrawer] = useAtom(drawerState)
  const pageTitle = usePageTitle()

  useEffect(() => {
    setDrawer(!isMobile)
  }, [isMobile, setDrawer])

  return (
    <MuiAppBar className={classes.appbar} position='fixed' elevation={1}>
      <Toolbar>
        <IconButton
          size={isMobile ? 'small' : 'medium'}
          onClick={() => setDrawer((prev) => !prev)}
        >
          {isMobile && drawer ? (
            <CloseIcon fontSize={isMobile ? 'small' : 'medium'} />
          ) : (
            <MenuIcon fontSize={isMobile ? 'small' : 'medium'} />
          )}
        </IconButton>
        <Typography variant='h6'>
          <NavLink to='/' style={{ color: 'unset', textDecoration: 'none' }}>
            Proactiva
          </NavLink>
        </Typography>
        {!isMobile && (
          <Typography className={classes.pageName}>{pageTitle}</Typography>
        )}
        <SyncState />
      </Toolbar>
    </MuiAppBar>
  )
}
