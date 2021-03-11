import { useState } from 'react'
import { Box, Hidden, SwipeableDrawer } from '@material-ui/core'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import ProjectTree from '../features/ProjectTree/ProjectTree'
import Dashboard from './Dashboard'
import TaskList from './TaskList'

export default function Index() {
  const [drawer, setDrawer] = useState(false)
  return (
    <Router>
      <div style={{ display: 'flex', height: '100%' }}>
        <Hidden smUp>
          <SwipeableDrawer
            open={drawer}
            onClose={() => setDrawer(false)}
            onOpen={() => setDrawer(true)}
            swipeAreaWidth={100}
          >
            <ProjectTree />
          </SwipeableDrawer>
          {!drawer && (
            <div style={{ width: '12px', backgroundColor: '#424242' }} />
          )}
        </Hidden>
        <Hidden xsDown>
          <Box bgcolor='background.paper'>
            <ProjectTree />
          </Box>
        </Hidden>
        <Switch>
          <Route exact path='/' children={<Dashboard />} />
          <Route path='/:id' children={<TaskList />} />
        </Switch>
      </div>
    </Router>
  )
}
