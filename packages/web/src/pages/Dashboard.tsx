import React from 'react'
import { Typography } from '@material-ui/core'
import DashboardFeature from '../features/Dashboard'
import { useIsMobile } from '../utils'

export default function Dashboard() {
  const isMobile = useIsMobile()
  return (
    <div
      style={{
        paddingTop: '32px',
        paddingLeft: '45px',
      }}
    >
      {isMobile && (
        <Typography variant='h5' style={{ paddingBottom: '10px' }}>
          Dashboard
        </Typography>
      )}
      <DashboardFeature />
    </div>
  )
}
