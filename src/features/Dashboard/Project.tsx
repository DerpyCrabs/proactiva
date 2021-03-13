import { useAtomValue } from 'jotai/utils'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import {
  Note,
  Project as ProjectType,
  Todo,
  projectTasksState,
} from '../../state'
import Task from './Task'

export default function Project({ project }: { project: ProjectType }) {
  const projectTasks = useAtomValue(projectTasksState(project.id))

  return (
    <Droppable key={project.id} droppableId={`${project.id}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          {...provided.droppableProps}
        >
          {projectTasks.map((task: Note | Todo, index: number) => (
            <Task task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: 16,
  width: 250,
})
