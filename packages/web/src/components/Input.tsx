import { InputBase } from '@mui/material'
import { withStyles } from '@mui/styles'

const Input = withStyles({
  root: {
    border: '2px solid transparent',
    borderRadius: '4px',
  },
  focused: {
    border: '2px solid #90caf9',
  },
  input: {
    fontSize: '16px',
    padding: '6px',
  },
})(InputBase)

export default Input
