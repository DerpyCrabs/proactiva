import { useAtom } from 'jotai'
import React from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import { Divider, List } from '@material-ui/core'
import { Id, projectTasksState } from '../../state'
import { reorder } from '../../utils'
import AddTask from './AddTask'
import TaskItem from './Task'

const getListStyle = () => ({
  background: 'unset',
  padding: 0,
  maxWidth: '1000px',
  flexGrow: 1,
})

export default function TaskList({ projectId }: { projectId: Id }) {
  const [tasks, setTasks] = useAtom(projectTasksState(projectId))

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
                  <TaskItem projectId={projectId} item={item} index={index} />
                  <Divider />
                </React.Fragment>
              ))}
              {provided.placeholder}
              <AddTask projectId={projectId} />
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
