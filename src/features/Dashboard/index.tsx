import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import React from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { favoriteProjectsValue, tasksState } from '../../state'
import { Task } from '../../types'
import { reorder } from '../../utils'
import FavoriteProjects from './FavoriteProjects'
import Project from './Project'

export default function Dashboard() {
  const favoriteProjects = useAtomValue(favoriteProjectsValue)
  const setTasks = useUpdateAtom(tasksState)
  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return
    }

    setTasks((tasks) => {
      const sourceId = Number(result.source.droppableId)
      const destinationId = Number(result.destination?.droppableId)
      if (sourceId === destinationId) {
        return reorderSameProject(result, tasks)
      } else {
        return reorderDifferentProjects(result, tasks)
      }
    })
  }

  return (
    <div>
      <FavoriteProjects />

      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {favoriteProjects.map((project) => (
            <Project project={project} key={project.id} />
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

const reorderSameProject = (
  result: DropResult,
  tasks: Array<Task>
): Array<Task> => {
  const destinationId = Number(result.destination?.droppableId)
  const destinationIndex = result.destination?.index
  const draggableId = Number(result.draggableId)

  const startIndex = tasks.findIndex((t) => t.id === draggableId)
  const endIndex = (() => {
    let destinationPos = -1
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].parent === destinationId) {
        destinationPos += 1
        if (destinationPos === destinationIndex) {
          return i
        }
      }
    }
    return tasks.length
  })() as number

  return reorder(tasks, startIndex, endIndex)
}

const reorderDifferentProjects = (
  result: DropResult,
  tasks: Array<Task>
): Array<Task> => {
  const destinationId = Number(result.destination?.droppableId)
  const destinationIndex = result.destination?.index
  const draggableId = Number(result.draggableId)

  const startIndex = tasks.findIndex((t) => t.id === draggableId)
  let tasksCopy = tasks.slice()
  const [removed] = tasksCopy.splice(startIndex, 1)
  const endIndex = (() => {
    let destinationPos = -1
    for (let i = 0; i < tasks.length; i++) {
      if (
        tasksCopy[i].parent === destinationId &&
        tasksCopy[i].kind !== 'Project'
      ) {
        destinationPos += 1
      }
      if (destinationPos + 1 === destinationIndex) {
        return i + 1
      }
    }
    return tasksCopy.length
  })() as number
  tasksCopy.splice(endIndex, 0, { ...removed, parent: destinationId })
  return tasksCopy
}
