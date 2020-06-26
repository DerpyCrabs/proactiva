import React from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { Divider, List, Typography } from '@material-ui/core'
import { Task, projectState } from '../../state'
import AddTask from './AddTask'
import TaskItem from './Task'

const reorder = (oldArr: Array<any>, startIndex: number, endIndex: number) => {
  let arr = oldArr.slice()
  const [removed] = arr.splice(startIndex, 1)
  arr.splice(endIndex, 0, removed)
  return arr
}

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? '#444' : 'unset',
  padding: 0,
  maxWidth: '1000px',
  flexGrow: 1,
})

export default function TaskList() {
  let { id } = useParams()
  const [project, setProject] = useRecoilState(projectState(parseInt(id)))
  const setTasks = (items: Array<Task>) =>
    setProject((project) => ({ ...project, tasks: items }))

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const newTasks = reorder(
      project.tasks.slice(),
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
        <Typography
          variant='h5'
          style={{ paddingLeft: '18px', paddingBottom: '10px' }}
        >
          Project name
        </Typography>
        <div style={{ display: 'flex', flexGrow: 1 }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
              {(provided, snapshot) => (
                <List
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {project.tasks.map((item: any, index: number) => (
                    <React.Fragment key={item.id}>
                      <TaskItem item={item} index={index} />
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
