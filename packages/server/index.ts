import { Project, Todo } from 'common-types'
import express from 'express'

const app = express()
app.use(express.json())
const PORT = 4200

let state = [
  {
    id: 1,
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
  },
]

app.get('/:id', (req, res) =>
  res.json(state.find((user) => user.id.toString() === req.params.id))
)
app.post('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  state = [{ ...req.body, id }, ...state.filter((u) => u.id !== id)]
  return res.json(state)
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})
