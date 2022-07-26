import * as React from 'react'
import { Box, Paper, Typography } from '@mui/material'

const Hero = () => {
  return <Paper sx={{ mb: 2, flexGrow: 1, display: 'flex', width: '100%' }}>
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Typography variant="h2">
        Reccettar
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Discover and share!
      </Typography>
    </Box>
  </Paper>
}

export default Hero
