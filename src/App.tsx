import { Button, ThemeProvider, createTheme, Container } from '@mui/material';
import React from 'react'
import { useState } from 'react';

import {
  Map,
  Navigation
} from './components'

const theme = createTheme({
  palette: {
    mode: 'dark'
  },
});

function App(): JSX.Element {
  const [modalOpen, setModalOpen] = useState<boolean>(true)

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Button variant='contained' onClick={() => setModalOpen(true)}>Calculate New Distance</Button>
        <Navigation isOpen={modalOpen} close={() => setModalOpen(false)} />
        <Map />
      </Container>
    </ThemeProvider>
  );
}

export default App;
