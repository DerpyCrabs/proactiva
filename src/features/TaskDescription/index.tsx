import { useAtom } from 'jotai'
import { lensProp, set } from 'ramda'
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core'
import { Id, taskState } from '../../state'
import DescriptionEditor from './DescriptionEditor'
import Dialog from '../../components/Dialog'

export default function TaskDescription({
  id,
  isOpen,
  close,
}: {
  id: Id
  isOpen: boolean
  close: () => void
}) {
  const [task, setTask] = useAtom(taskState(id))

  if (task === undefined) {
    close()
    return <div>Failed to find task with id {id}</div>
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => close()}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>
        Edit {task.kind.toLocaleLowerCase()} "{task.name}"
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='Title'
          type='text'
          fullWidth
          value={task.name}
          onChange={(e) => setTask(set(lensProp('name'), e.target.value))}
        />
        <DescriptionEditor
          description={task.description || ''}
          setDescription={(e) => setTask(set(lensProp('description'), e))}
        />
        <DialogContentText style={{ paddingTop: '10px' }}>
          Creation date: {task.creationDate.toLocaleString()}
        </DialogContentText>
        <DialogContentText>
          Modification date: {task.modificationDate.toLocaleString()}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
