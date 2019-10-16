import React from 'react';
import Routes from './src/routes'
import { YellowBox } from 'react-native'

// Usaremos isto para ignorar um aviso.
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return (
    <Routes />
  );
}
