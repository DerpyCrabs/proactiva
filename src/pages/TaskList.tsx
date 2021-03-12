import React from 'react'
import { useAtom } from 'jotai'
import { useHistory, useParams } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import TaskList from '../features/TaskList/TaskList'
import { taskState } from '../state'

const PageTaskList = () => {
  let { id } = useParams() as { id: string }
  const [project] = useAtom(taskState(parseInt(id)))
  const history = useHistory()

  if (project === undefined) {
    history.push('/')
    return <span>Redirecting...</span>
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '1000px',
            paddingTop: '32px',
            paddingRight: '45px',
            paddingLeft: '45px',
          }}
        >
          <Typography variant='h5' style={{ paddingBottom: '10px' }}>
            {project.name}
          </Typography>
          <TaskList projectId={project.id} />
        </div>
      </div>
    </>
  )
}

export default PageTaskList
