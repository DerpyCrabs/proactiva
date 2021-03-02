import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import ProjectTree from '../features/ProjectTree/ProjectTree'
import TaskList from '../features/TaskList/TaskList'
import Dashboard from './Dashboard'

export default function Index() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <ProjectTree />
        <Switch>
          <Route exact path='/' children={<Dashboard />} />
          <Route path='/:id' children={<TaskList />} />
        </Switch>
      </div>
    </Router>
  )
}
