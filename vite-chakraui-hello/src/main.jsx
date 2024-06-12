// import React from 'react'
// import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import form from './enquiryForm.jsx'
// import './index.css'

import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>

    <ChakraProvider>
      <App />
    </ChakraProvider>

  </React.StrictMode>,
)
