import React from 'react'
import {
  Box,
  DialogProps,
  DialogTitle,
  IconButton,
  Dialog as MuiDialog,
  Theme,
  Typography,
  createStyles,
  withStyles,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useIsMobile } from '../utils'

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',

      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(2),
        maxWidth: `calc(100% - ${theme.spacing(2) * 2}px)`,
      },
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(4),
        maxWidth: '860px',
      },
    },

    dialogTitle: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  })

const Dialog = ({
  scroll = 'body',
  maxWidth = false,
  title,
  classes,
  children,
  onClose,
  ...restProps
}: DialogProps & { title: string; onClose: () => void; classes: any }) => {
  const fullScreen = useIsMobile()
  return (
    <MuiDialog fullScreen={fullScreen} scroll={scroll} maxWidth={maxWidth} onClose={onClose} {...restProps}>
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6' className={classes.dialogTitle}>
            {title}
          </Typography>
          <IconButton aria-label='close' onClick={onClose} size='small'>
            <CloseIcon fontSize='small' />
          </IconButton>
        </Box>
      </DialogTitle>
      {children}
    </MuiDialog>
  )
}

export default withStyles(styles)(Dialog)
