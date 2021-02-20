import { WritableAtom, atom } from 'jotai'
import { SetStateAction } from 'jotai/core/types'
import { focusAtom } from 'jotai/optics'

export type Id = number

export interface Task {
  id: Id
  name: string
  description?: string
  creationDate: Date
  modificationDate: Date
  parent?: Id
  kind: string
}

export interface Todo extends Task {
  kind: 'Todo'
  status: boolean
}

export interface Project extends Task {
  kind: 'Project'
  history: Array<{ task: Task; deleted: Date }>
  isExpanded: boolean
}

export interface Note extends Task {
  kind: 'Note'
}

export const tasksState = atom<Array<Task>>([
  {
    kind: 'Project',
    id: 1,
    name: '/',
    description: 'Root project',
    history: [],
    creationDate: new Date(),
    modificationDate: new Date(),
    isExpanded: false,
  } as Project,
  {
    kind: 'Todo',
    id: 2,
    name: 'task 1',
    status: true,
    parent: 1,
    creationDate: new Date(),
    modificationDate: new Date(),
  } as Todo,
])

export const maxIdState = atom((get) => {
  const tasks = get(tasksState)
  return Math.max(...tasks.map((t) => t.id))
})

export const taskState = (id: number) =>
  focusAtom(tasksState, (optic) => optic.find((t) => t.id === id))

export const projectTasksState = (id: number) =>
  focusAtom(tasksState, (optic) =>
    optic.filter(
      (t) => t.parent === id && (t.kind === 'Todo' || t.kind === 'Note')
    )
  )

export const projectsState = (focusAtom(tasksState, (optic) =>
  optic.filter((t) => t.kind === 'Project')
) as unknown) as WritableAtom<Project[], SetStateAction<Project[]>>
