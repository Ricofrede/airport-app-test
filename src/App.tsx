import {
  Button,
  ThemeProvider,
  createTheme,
  Container,
  Box,
  Typography
} from '@mui/material';
import { useState, useEffect } from 'react';
import { getDistance } from 'geolib'

import {
  Map,
  Navigation
} from './components'

import {
  Airport
} from './api';

const theme = createTheme({
  palette: {
    mode: 'dark'
  },
});

function App(): JSX.Element {
  const [modalOpen, setModalOpen] = useState<boolean>(true)
  const [startAirport, setStartAirport] = useState<Airport | null>(null)
  const [endAirport, setEndAirport] = useState<Airport | null>(null)
  const [isReady, setIsReady] = useState<boolean>(false)
  const [distance, setDistance] = useState<string>('')

  useEffect(() => {
    if (isReady && startAirport && endAirport) {
      const newDistanceRaw = getDistance(
        { latitude: startAirport.lat, longitude: startAirport.lng },
        { latitude: endAirport.lat, longitude: endAirport.lng }
      )

      const distanceRawWorld = Math.floor(newDistanceRaw / 1000)
      const distanceRawUSA = Math.floor(distanceRawWorld / 1.609)

      const distanceWorld = new Intl.NumberFormat()
        .format(distanceRawWorld)
      const distanceUSA = new Intl.NumberFormat()
        .format(distanceRawUSA)


      setDistance(`${distanceUSA} Mi (${distanceWorld} Km)`)
    } else {
      setDistance('')
    }
  }, [isReady])

  function reset() {
    setStartAirport(null)
    setEndAirport(null)
    setIsReady(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Button
          variant='contained'
          onClick={() => { reset(); setModalOpen(true); }}
        >
          Calculate New Distance
        </Button>
        {distance ? (
          <Box style={{ backgroundColor: 'white' }}>
            <Typography>Total distance: {distance}</Typography>
          </Box>
        ) : <></>}
        <Navigation
          isOpen={modalOpen}
          close={() => setModalOpen(false)}
          chooseStart={(start: Airport | null) => setStartAirport(start)}
          chooseEnd={(end: Airport | null) => setEndAirport(end)}
          submit={() => setIsReady(true)}
        />
        <Map
          start={startAirport}
          end={endAirport}
          isReady={isReady}
        />
      </Container>
    </ThemeProvider >
  );
}

export default App;
