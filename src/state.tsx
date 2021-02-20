import { atom } from 'jotai'
import { focusAtom } from 'jotai/optics'

export interface Task {
  kind: 'Task'
  id: number
  name: string
  checked: boolean
}
export interface Project {
  kind: 'Project'
  id: number
  name: string
  isExpanded: boolean
  parentId: number
  tasks: Array<Task>
}

export const projectsState = atom<Array<Project>>([
  {
    kind: 'Project',
    id: 1,
    parentId: 0,
    name: 'kek-child1',
    isExpanded: true,
    tasks: [
      { kind: 'Task', id: 4, name: 'task 1', checked: false },
      { kind: 'Task', id: 5, name: 'task 2', checked: false },
      { kind: 'Task', id: 6, name: 'task 3', checked: true },
      { kind: 'Task', id: 7, name: 'task 4', checked: false },
      { kind: 'Task', id: 8, name: 'task 5', checked: false },
      { kind: 'Task', id: 9, name: 'task 6', checked: true },
    ],
  },
  {
    kind: 'Project',
    id: 2,
    parentId: 0,
    name: 'kek-child2',
    isExpanded: false,
    tasks: [],
  },
  {
    kind: 'Project',
    id: 3,
    parentId: 1,
    name: 'kek-child1-child',
    isExpanded: false,
    tasks: [],
  },
])

export const rootState = atom(0)

export const maxIdState = atom((get) => {
  const projects = get(projectsState)
  return Math.max(
    ...projects.flatMap((project) => [
      project.id,
      ...project.tasks.map((t) => t.id),
    ])
  )
})

export const projectState = (id: number) =>
  focusAtom(projectsState, (optic) =>
    optic.find((project) => project.id === id)
  )
