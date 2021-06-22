import { Toolbar, IconButton, AppBar as MuiAppBar, useMediaQuery, Theme, makeStyles, Typography } from "@material-ui/core"
import { useEffect } from "react"
import CloseIcon from '@material-ui/icons/Close'
import MenuIcon from '@material-ui/icons/Menu'
import { drawerState } from "../../state"
import { useAtom } from "jotai" 
import React from 'react'
import SyncState from "./SyncState"

const useStyles = makeStyles((theme: Theme) => ({
  appbar: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 15%)',
  },
  title: {
    flexGrow: 1,
  }
}))

export default function AppBar() {
  const classes = useStyles()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))
  const [drawer, setDrawer] = useAtom(drawerState)

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
          <CloseIcon fontSize={isMobile ? 'small' : 'default'} />
        ) : (
          <MenuIcon fontSize={isMobile ? 'small' : 'default'} />
        )}
      </IconButton>
      <Typography variant="h6" className={classes.title}>Proactiva</Typography>
      <SyncState />
    </Toolbar>
  </MuiAppBar>
  )
}