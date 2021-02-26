import {
  Dialog as MuiDialog,
  DialogProps,
  Theme,
  useMediaQuery,
} from '@material-ui/core'
import { createStyles, useTheme, withStyles } from '@material-ui/styles'

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      width: '100%',

      [theme.breakpoints.up('xs')]: {
        color: '#f00',
      },
      [theme.breakpoints.up('sm')]: {
        color: '#0f0',
        margin: theme.spacing(2),
        maxWidth: `calc(100% - ${theme.spacing(2) * 2}px)`,
      },
      [theme.breakpoints.up('md')]: {
        color: '#00f',
        margin: theme.spacing(4),
        //maxWidth: `calc(100% - ${theme.spacing(8) * 2}px)`,
        maxWidth: '860px',
      },
      [theme.breakpoints.up('lg')]: {
        color: '#ff0',
      },
      [theme.breakpoints.up('xl')]: {
        color: '#0ff',
      },
    },
  })
const Dialog = ({
  scroll = 'body',
  maxWidth = false,
  ...others
}: DialogProps) => {
  const theme = useTheme() as Theme
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <MuiDialog
      fullScreen={fullScreen}
      scroll={scroll}
      maxWidth={maxWidth}
      {...others}
    />
  )
}

export default withStyles(styles)(Dialog)
