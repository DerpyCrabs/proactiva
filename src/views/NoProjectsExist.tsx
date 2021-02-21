import { Typography } from '@material-ui/core'

export default function NoProjectsExist() {
  return (
    <div
      style={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#222',
      }}
    >
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '1000px',
          paddingTop: '32px',
          paddingRight: '45px',
          paddingLeft: '45px',
        }}
      >
        <Typography variant='h5' style={{ paddingBottom: '10px' }}>
          No projects exist
        </Typography>
      </div>
    </div>
  )
}
