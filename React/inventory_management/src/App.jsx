import '@trussworks/react-uswds/lib/index.css';
import { useState } from 'react'
import Warehouses from './Components/Pages/Warehouses';
import Navigation from './Components/Navigation';
import Inventory from './Components/Pages/Inventory';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Toys from './Components/Pages/Toys';
import toast, {Toaster} from 'react-hot-toast';
import './App.css';


function App() {



  return (
    <>
      <div><Toaster/></div>               {/*Toaster comes from react-hot-toast and allows for creation of the success and error messages I've added in all fetch functions */}
      <Navigation></Navigation>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element = {<Warehouses />}/>
          <Route path='/inventory' element = {<Inventory />}/>
          <Route path='/toys' element = {<Toys />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

