import { Project, Task, Todo, User } from 'common-types'
import cors from 'cors'
import express from 'express'
import JsonDB, { FileStorage } from 'definitely-not-jsondb'

const storage = new FileStorage<(User | { token: string | null })[]>(
  [
    {
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
      ] as Task[],
      favoriteProjects: [],
    },
  ],
  { persist: './db.json' }
)

const db = new JsonDB(storage)

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 4200

app.get('/:id', (req, res) =>
  db.transact({ user: `${+req.params.id - 1}` })((state) =>
    res.json(state.user)
  )
)
app.post('/:id', (req, res) =>
  db.transact({ user: `${+req.params.id - 1}` })((state) => {
    state.user = { ...req.body, id: +req.params.id }
    return res.sendStatus(200)
  })
)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})
