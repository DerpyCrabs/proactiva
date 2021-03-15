import type { Note, Todo } from 'common-types'
import { useUpdateAtom } from 'jotai/utils'
import { assoc } from 'ramda'
import React, { CSSProperties } from 'react'
import { Draggable, DraggableProvidedDraggableProps } from 'react-beautiful-dnd'
import { Checkbox } from '@material-ui/core'
import { Subject } from '@material-ui/icons'
import { taskState } from '../../state'
import TaskDescription from '../TaskDescription'

export default function Task({
  task,
  index,
  deleteTask,
}: {
  task: Todo | Note
  index: number
  deleteTask: () => void
}) {
  const setTask = useUpdateAtom(taskState(task.id))
  const [showDescriptionModal, setShowDescriptionModal] = React.useState(false)
  return (
    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          {task.kind === 'Todo' ? (
            <Checkbox
              checked={task.status}
              size='small'
              onChange={() => setTask(assoc('status', !task.status))}
            />
          ) : (
            <Subject
              style={{
                height: '40.84px',
                width: '40.84px',
                padding: '9px',
                color: '#cecece',
              }}
            />
          )}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            {task.name}
            <button type='button' onClick={deleteTask}>
              delete
            </button>
            <button onClick={() => setShowDescriptionModal(true)}>edit</button>
            <TaskDescription
              id={task.id}
              isOpen={showDescriptionModal}
              close={() => setShowDescriptionModal(false)}
            />
          </div>
        </div>
      )}
    </Draggable>
  )
}

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggableProvidedDraggableProps['style']
) =>
  ({
    userSelect: 'none',
    padding: 16 * 2,
    margin: `0 0 ${16}px 0`,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle,
  } as CSSProperties)
