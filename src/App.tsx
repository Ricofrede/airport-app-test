import {
  Button,
  ThemeProvider,
  createTheme,
  Box,
  Typography
} from '@mui/material';
import { useState } from 'react';

import {
  Map,
  Navigation
} from './components'

import styles from './assets/mui/global';

import {
  Airport
} from './api';
import useDistance from './hooks/useDistance';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f00'
    }
  },
  typography: {
    fontFamily: 'Roboto',
  },
});

function App(): JSX.Element {
  const [modalOpen, setModalOpen] = useState<boolean>(true)
  const [startAirport, setStartAirport] = useState<Airport | null>(null)
  const [endAirport, setEndAirport] = useState<Airport | null>(null)
  const [isReady, setIsReady] = useState<boolean>(false)

  const distance = useDistance({
    isReady: isReady,
    start: startAirport,
    end: endAirport
  })

  function reset() {
    setStartAirport(null)
    setEndAirport(null)
    setIsReady(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={styles.upperBox}>
        <Box sx={styles.newDistanceBox}>
          <Button
            sx={styles.newDistanceButton}
            variant='contained'
            onClick={() => { reset(); setModalOpen(true); }}
          >
            Calculate New Distance
          </Button>
        </Box>
        <Box sx={styles.labelDistanceBox}>
          {distance ? (
            <Typography sx={styles.labelDistanceText}>Total distance: {distance}</Typography>
          ) : (
            <Typography sx={styles.labelDistanceText}>Airports Distance Calculator</Typography>
          )}
        </Box>
      </Box>
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
    </ThemeProvider >
  );
}

export default App;
