import React from 'react'
import { Typography } from '@material-ui/core'
import DashboardFeature from '../features/Dashboard'
import { useIsMobile } from '../utils'
import { usePageTitle, useSetPageTitle } from '../state'

export default function Dashboard() {
  const isMobile = useIsMobile()
  const pageTitle = usePageTitle()
  useSetPageTitle('Dashboard')

  return (
    <div
      style={{
        padding: '32px',
      }}
    >
      {isMobile && (
        <Typography variant='h5' style={{ paddingBottom: '10px' }}>
          {pageTitle}
        </Typography>
      )}
      <DashboardFeature />
    </div>
  )
}
