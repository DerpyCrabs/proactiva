import React, { CSSProperties } from 'react'
import { Draggable, DraggableProvidedDraggableProps } from 'react-beautiful-dnd'
import { Note, Todo } from '../../state'

export default function Task({
  task,
  index,
}: {
  task: Todo | Note
  index: number
}) {
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            {task.name}
            <button type='button' onClick={() => {}}>
              delete
            </button>
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
