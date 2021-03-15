import type { Id, Note, Project as ProjectType, Todo } from 'common-types'
import { useAtom } from 'jotai'
import { complement, filter, propEq } from 'ramda'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { projectTasksState } from '../../state'
import AddTask from './AddTask'
import Task from './Task'

export default function Project({ project }: { project: ProjectType }) {
  const [projectTasks, setProjectTasks] = useAtom(projectTasksState(project.id))

  const deleteTask = (id: Id) => () => {
    setProjectTasks(filter(complement(propEq('id', id))))
  }

  return (
    <div>
      <Droppable key={project.id} droppableId={`${project.id}`}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {projectTasks.map((task: Note | Todo, index: number) => (
              <Task
                task={task}
                index={index}
                deleteTask={deleteTask(task.id)}
                key={task.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddTask projectId={project.id} />
    </div>
  )
}

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: 16,
  width: 250,
})
