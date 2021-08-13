import { Paper, Typography, Theme } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import type { Id, Note, Project as ProjectType, Todo } from 'common-types'
import { useAtom } from 'jotai'
import { complement, filter, propEq } from 'ramda'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { projectTasksState } from '../../state'
import AddTask from './AddTask'
import Task from './Task'

const useStyles = makeStyles((theme: Theme) => ({
  tasksWrapper: {
    paddingTop: theme.spacing(2),
    paddingBottom: 0,
    margin: `0 ${theme.spacing(2)}`,
    borderTop: `1px solid ${theme.palette.grey[800]}`,

    '& > div': {
      marginBottom: theme.spacing(2),
    },
  },

  title: {
    padding: '0px 24px',
    height: `calc(${theme.typography.h6.fontSize} * ${theme.typography.h6.lineHeight} * 2)`,
    overflow: 'hidden',

    '& > .MuiTypography-root': {
      display: '-webkit-inline-box',
      lineHeight: 1.3,
      maxHeight: '100%',
      verticalAlign: 'middle',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
    },

    '&:after': {
      content: '""',
      height: '100%',
      display: 'inline-block',
      verticalAlign: 'middle',
    },
  },
}))

export default function Project({ project }: { project: ProjectType }) {
  const classes = useStyles()
  const [projectTasks, setProjectTasks] = useAtom(projectTasksState(project.id))

  const deleteTask = (id: Id) => () => {
    setProjectTasks(filter(complement(propEq('id', id))))
  }

  return (
    <Paper elevation={0}>
      <div className={classes.title}>
        <Typography variant='h6'>{project.name}</Typography>
      </div>
      <Droppable key={project.id} droppableId={`${project.id}`}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={classes.tasksWrapper}
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
    </Paper>
  )
}
