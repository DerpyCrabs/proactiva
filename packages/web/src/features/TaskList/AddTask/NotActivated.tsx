import React from 'react'
import { Box } from '@mui/material'
import { Add } from '@mui/icons-material'

export default function NotActivated({ activate }: { activate: () => void }) {
  return (
    <Box
      style={{
        color: '#aaa',
        padding: '8px',
        paddingLeft: '0px',
        paddingTop: '8px',
        cursor: 'pointer',
      }}
      onClick={activate}
    >
      <span>
        <Add
          style={{
            color: '#de4c4a',
            fontSize: 18,
            verticalAlign: 'middle',
            marginRight: '8px',
          }}
        />
      </span>
      <span style={{ fontSize: '16px', fontFamily: 'Exo 2 rev=1' }}>
        Add task
      </span>
    </Box>
  )
}
