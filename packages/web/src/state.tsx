import type { Id, Note, Project, Todo, User } from 'common-types'
import { WritableAtom, atom } from 'jotai'
import { SetStateAction } from 'jotai/core/types'
import { focusAtom } from 'jotai/optics'

const userState = atom<User>({
  email: 'mail@example.com',
  name: 'Example user',
  token: null,
  tasks: [
    {
      kind: 'Project',
      id: 0,
      name: 'No parent',
      history: [],
      parent: -1,
      creationDate: new Date(),
      modificationDate: new Date(),
      isExpanded: false,
    } as Project,
    {
      kind: 'Project',
      id: 1,
      name: 'Project 1',
      description: 'Test project 1',
      history: [],
      creationDate: new Date(),
      modificationDate: new Date(),
      isExpanded: false,
      parent: 0,
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
    {
      kind: 'Todo',
      id: 4,
      name: 'task 2',
      status: true,
      parent: 1,
      creationDate: new Date(),
      modificationDate: new Date(),
    } as Todo,
    {
      kind: 'Todo',
      id: 6,
      name: 'task 4',
      status: true,
      parent: 1,
      creationDate: new Date(),
      modificationDate: new Date(),
    } as Todo,
    {
      kind: 'Project',
      id: 3,
      name: 'Project 2',
      description: 'Test project 2',
      history: [],
      creationDate: new Date(),
      modificationDate: new Date(),
      isExpanded: false,
      parent: 0,
    } as Project,
    {
      kind: 'Todo',
      id: 5,
      name: 'task 3',
      status: true,
      parent: 3,
      creationDate: new Date(),
      modificationDate: new Date(),
    } as Todo,
  ],
  favoriteProjects: [1, 3],
})

export const tasksState = focusAtom(userState, (optic) => optic.prop('tasks'))

export const maxIdState = atom((get) => {
  const tasks = get(tasksState)
  return Math.max(...tasks.map((t) => t.id))
})

export const taskState = (id: Id) =>
  focusAtom(tasksState, (optic) => optic.find((t) => t.id === id))

export const projectTasksState = (id: Id) =>
  (focusAtom(tasksState, (optic) =>
    optic.filter(
      (t) => t.parent === id && (t.kind === 'Todo' || t.kind === 'Note')
    )
  ) as unknown) as WritableAtom<
    Array<Todo | Note>,
    SetStateAction<Array<Todo | Note>>
  >

export const projectsState = (focusAtom(tasksState, (optic) =>
  optic.filter((t) => t.kind === 'Project')
) as unknown) as WritableAtom<Project[], SetStateAction<Project[]>>

export const favoriteProjectIdsState = focusAtom(userState, (optic) =>
  optic.prop('favoriteProjects')
)

export const favoriteProjectsValue = atom<Array<Project>>((get) => {
  const projects = get(projectsState)
  const favoriteProjectIds = get(favoriteProjectIdsState)
  return favoriteProjectIds
    .map((id) => projects.find((p) => p.id === id))
    .filter((p) => p !== undefined) as Array<Project>
})
