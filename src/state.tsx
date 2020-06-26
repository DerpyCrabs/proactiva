import { RecoilState, atom, selector, selectorFamily } from 'recoil'

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

export const projectsState = atom({
  key: 'projects',
  default: [
    { name: 'Root', id: 0, isExpanded: false, parentId: 0, kind: 'Project' },
  ] as Array<Project>,
})

export const rootState = selector({
  key: 'root',
  get: ({ get }) => 0,
})

// const maxIdState = selector({
//   key: 'maxId',
//   get: ({ get }) => {
//     const state = get(projectsState)
//     return Math.max(...state.projects.map((project) => project.id))
//     // TODO: count tasks too
//   },
// })

export const projectState = selectorFamily({
  key: 'project',
  get: (projectId: number) => ({ get }) => {
    const projects = get(projectsState)
    const project = projects.find((project) => project.id === projectId)
    if (project === undefined)
      throw new Error(`Failed to find project with id ${projectId}`)
    return project
  },
  set: (projectId: number) => ({ set, get }, newValue) => {
    set(projectsState, (projects) => [
      ...projects.filter((project) => project.id !== projectId),
      newValue,
    ])
  },
}) as (param: number) => RecoilState<Project>
