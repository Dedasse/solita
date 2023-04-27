import React from 'react'

import {Box} from '@mui/material'
import AllTrips from './components/trips'
import AllPlaces from './components/places'
const App = () => {
  return (
    <Box sx={{backgroundColor: '#fff'}} >
      < AllTrips />
      < AllPlaces />
    </Box>
  )
}

export default App
