import { useAtom } from 'jotai'
import { favoriteProjectsState } from '../state'

export default function Dashboard() {
  const [favoriteProjects, setFavoriteProjects] = useAtom(favoriteProjectsState)

  return <div>{favoriteProjects.map((project) => project.name)}</div>
}
