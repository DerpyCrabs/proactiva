import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import React, { CSSProperties } from 'react'
import {
  DragDropContext,
  Draggable,
  DraggableProvidedDraggableProps,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd'
import { favoriteProjectIdsState, favoriteProjectsValue } from '../../state'
import { reorder } from '../../utils'

const grid = 8

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggableProvidedDraggableProps['style']
) =>
  ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle,
  } as CSSProperties)

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
})

export default function FavoriteProjects() {
  const favoriteProjects = useAtomValue(favoriteProjectsValue)
  const setFavoriteProjectIds = useUpdateAtom(favoriteProjectIdsState)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const destination = result.destination

    setFavoriteProjectIds((favoriteProjectIds) =>
      reorder(favoriteProjectIds, result.source.index, destination.index)
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable' direction='horizontal'>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {favoriteProjects.map((project, index) => (
              <Draggable
                key={project.id}
                draggableId={project.id.toString()}
                index={index}
              >
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
                    {project.name}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
