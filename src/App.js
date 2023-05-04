import './css/reset.css'
import 'bootstrap/dist/css/bootstrap.css';
import './css/general.css'
import './css/button.css'
import './css/product.css'
import './css/header.css'

import React from 'react';
import Login from './components/login';
import Commodity from './components/commodity';
import Signup from './components/signup';
import User from './components/user';
//import Provider from './components/provider';
import Home from './components/home'
import Provider from './components/provider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/error.css'
import './css/login.css'
import './css/user.css'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/commodity" element={<Commodity/>}/>
          <Route exact path="/user" element={<User/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/provider" element={<Provider/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
