import { makeStyles, Theme } from '@material-ui/core'

import type { Task } from 'common-types'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import React from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import {
  favoriteProjectIdsState,
  favoriteProjectsValue,
  tasksState,
} from '../../state'
import { reorder } from '../../utils'
import Project from './Project'

const useStyles = makeStyles((theme: Theme) => ({
  projectsWrapper: {
    display: 'flex',
    width: '100%',

    '& > div': {
      margin: `0px ${theme.spacing(1)}px`,
      height: 'fit-content',
    },
  },
  projectWrapper: {
    borderRadius: 4,
    userSelect: 'none',
    width: '360px',
    flexShrink: 0,
  },
}))

export default function Dashboard() {
  const classes = useStyles()
  const favoriteProjects = useAtomValue(favoriteProjectsValue)
  const setTasks = useUpdateAtom(tasksState)
  const setFavoriteProjectIds = useUpdateAtom(favoriteProjectIdsState)

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return
    }

    if (result.type === 'project') {
      const destination = result.destination
      setFavoriteProjectIds((favoriteProjectIds) =>
        reorder(favoriteProjectIds, result.source.index, destination.index)
      )
    } else {
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
  }

  const renderFavoriteProjects = favoriteProjects.map((project, index) => (
    <Draggable
      key={project.id}
      draggableId={`project-${project.id.toString()}`}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          className={classes.projectWrapper}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Project project={project} key={project.id} />
        </div>
      )}
    </Draggable>
  ))

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='project' direction='horizontal' type='project'>
        {(provided, snapshot) => (
          <div
            className={classes.projectsWrapper}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {renderFavoriteProjects}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
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
