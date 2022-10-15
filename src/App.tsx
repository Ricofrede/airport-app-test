import { Button, ThemeProvider, createTheme, Container } from '@mui/material';
import { useState } from 'react';

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
