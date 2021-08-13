import { IconButton, Typography } from '@material-ui/core'
import { Sync } from '@material-ui/icons'
import { useAtomValue } from 'jotai/utils'
import React, { useEffect, useState } from 'react'
import { lastSyncTimeState, useForceSync } from '../../state'
import { formatDateRelativeToNow, useIsMobile } from '../../utils'

export default function SyncState() {
  const forceSync = useForceSync()
  const lastSyncTime = useAtomValue(lastSyncTimeState)
  const [formattedTime, setFormattedTime] = useState(
    lastSyncTime ? formatDateRelativeToNow(lastSyncTime) : 'Never'
  )
  const isMobile = useIsMobile()

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastSyncTime) {
        setFormattedTime(formatDateRelativeToNow(lastSyncTime))
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [lastSyncTime])

  if (isMobile) {
    const fiveMinutes = 1000 * 60 * 5
    const needsSync =
      lastSyncTime === undefined || +new Date() - +lastSyncTime > fiveMinutes

    return (
      <IconButton
        onClick={forceSync}
        style={{ color: needsSync ? 'yellow' : 'white', marginLeft: 'auto' }}
        size="large">
        <Sync />
      </IconButton>
    );
  } else {
    return <>
      <Typography>Last time synced: {formattedTime}</Typography>
      <IconButton onClick={forceSync} size="large">
        <Sync />
      </IconButton>
    </>;
  }
}
