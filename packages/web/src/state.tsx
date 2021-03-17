import axios from 'axios'
import type { Id, NetworkState, Note, Project, Todo } from 'common-types'
import { WritableAtom, atom } from 'jotai'
import { SetStateAction } from 'jotai/core/types'
import { focusAtom } from 'jotai/optics'

const networkState = atom<NetworkState, SetStateAction<NetworkState>>(
  async (_get) => {
    const data = localStorage.getItem('data')
    if (!data) {
      const data = await axios.get('http://localhost:4200/1')
      const user = await data.data
      const newState: NetworkState = {
        currentUserData: user,
        lastTimeSuccessfullyUpdated: new Date(),
      }
      localStorage.setItem('data', JSON.stringify(newState))
      return newState
    } else {
      const state = JSON.parse(data)
      return state
    }
  },
  async (get, set, setAction) => {
    let newState
    if (typeof setAction === 'function') {
      newState = setAction(get(networkState))
    } else {
      newState = setAction
    }
    localStorage.setItem('data', JSON.stringify(newState))
    set(networkState, newState)
  }
)

const userState = focusAtom(networkState, (optic) =>
  optic.prop('currentUserData')
)

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
