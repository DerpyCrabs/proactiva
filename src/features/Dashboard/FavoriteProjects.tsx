import { useAtom } from 'jotai'
import React, { CSSProperties } from 'react'
import {
  DragDropContext,
  Draggable,
  DraggableProvidedDraggableProps,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd'
import { favoriteProjectsState } from '../../state'
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
  const [favoriteProjects, setFavoriteProjects] = useAtom(favoriteProjectsState)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    console.log(result)
    console.log(
      reorder(favoriteProjects, result.source.index, result.destination.index)
    )
    setFavoriteProjects(
      reorder(favoriteProjects, result.source.index, result.destination.index)
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
