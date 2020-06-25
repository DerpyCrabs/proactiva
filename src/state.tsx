import { atom, selector, selectorFamily } from 'recoil'

export interface Project {
  kind: 'Project'
  id: number
  name: string
  isExpanded: boolean
  parentId: number
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
  get: (projectId) => ({ get }) => {
    const projects = get(projectsState)
    return projects.find((project) => project.id === projectId) as Project
  },
  set: (projectId) => ({ set, get }, newValue) => {
    set(projectsState, (projects) => [
      ...projects.filter((project) => project.id !== projectId),
      newValue,
    ])
  },
})
