import '@trussworks/react-uswds/lib/index.css';
import { useState } from 'react'
import Warehouses from './Components/Warehouses';
import Navigation from './Components/Navigation';

function App() {


  return (
    <>
      <Navigation></Navigation>
      <Warehouses></Warehouses>
      
    </>
  )
}

export default App
