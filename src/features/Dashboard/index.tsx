import { useAtomValue } from 'jotai/utils'
import React from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { favoriteProjectsState } from '../../state'
import FavoriteProjects from './FavoriteProjects'
import Project from './Project'

export default function Dashboard() {
  const favoriteProjects = useAtomValue(favoriteProjectsState)
  const onDragEnd = (result: DropResult) => {}

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
