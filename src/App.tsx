import React from 'react'

import {
  Map,
  Navigation
} from './components'

function App(): JSX.Element {
  return (
    <div className="App">
      <Map />
      <Navigation />
      {process.env.REACT_APP_API_URL}
    </div>
  );
}

export default App;
