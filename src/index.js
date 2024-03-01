import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraBaseProvider } from '@chakra-ui/react';
import theme from './theme/theme'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <App />
    </ChakraBaseProvider>
  </React.StrictMode>
)
