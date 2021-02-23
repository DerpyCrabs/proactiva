import { useAtom } from 'jotai'
import React from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import { useHistory, useParams } from 'react-router-dom'
import { Divider, List, Typography } from '@material-ui/core'
import { projectTasksState, taskState } from '../../state'
import AddTask from './AddTask'
import TaskItem from './Task'

function reorder<a>(
  oldArr: Array<a>,
  startIndex: number,
  endIndex: number
): Array<a> {
  let arr = oldArr.slice()
  const [removed] = arr.splice(startIndex, 1)
  arr.splice(endIndex, 0, removed)
  return arr
}

const getListStyle = () => ({
  background: 'unset',
  padding: 0,
  maxWidth: '1000px',
  flexGrow: 1,
})

export default function TaskList() {
  let { id } = useParams() as { id: string }
  const [project] = useAtom(taskState(parseInt(id)))
  const [tasks, setTasks] = useAtom(projectTasksState(parseInt(id)))
  const history = useHistory()
  if (project === undefined) {
    history.push('/')
    return <span>Redirecting...</span>
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const newTasks = reorder(
      tasks.slice(),
      result.source.index,
      result.destination.index
    )

    setTasks(newTasks)
  }
  return (
    <div
      style={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#222',
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
        <div style={{ display: 'flex', flexGrow: 1 }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
              {(provided, _snapshot) => (
                <List
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle()}
                >
                  {tasks.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <TaskItem
                        projectId={project.id}
                        item={item}
                        index={index}
                      />
                      <Divider />
                    </React.Fragment>
                  ))}
                  {provided.placeholder}
                  <AddTask projectId={project.id} />
                </List>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  )
}
