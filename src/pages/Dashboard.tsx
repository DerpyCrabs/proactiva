import React from 'react'
import { Typography } from '@material-ui/core'
import DashboardFeature from '../features/Dashboard'

export default function Dashboard() {
  return (
    <div>
      <Typography variant='h5' style={{ paddingBottom: '10px' }}>
        Dashboard
      </Typography>
      <DashboardFeature />
    </div>
  )
}
