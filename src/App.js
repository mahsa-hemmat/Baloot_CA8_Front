import './css/reset.css'
import 'bootstrap/dist/css/bootstrap.css';
import './css/general.css'
import './css/button.css'
import './css/product.css'
import './css/header.css'

import React, {useState} from 'react';
import Login from './components/login';
import Commodity from './components/commodity';
import Signup from './components/signup';
import User from './components/user';
//import Provider from './components/provider';
import Home from './components/home'
import Provider from './components/provider';
import {BrowserRouter, Route, Routes, useParams, Navigate} from 'react-router-dom';
import axios from 'axios';
import './css/error.css'
import './css/login.css'
import './css/user.css'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProviderHelp(){
    let param=useParams();
    return(<Provider param={param}/>)
}

function CommodityHelp(){
  let param=useParams();
  console.log(param);
  return(<Commodity param={param}/>)
}

function App() {
  const toastStyle = {
    fontFamily: 'Arial',
    fontSize: '28px'
};
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') !== null);

    const handleLogin = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoggedIn(true);
    };
    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
    };
    const ProtectedRoute = ({ path, element: Element }) => {
        if(isLoggedIn)
            return <Route path={path} element={Element} />
        else
            return <Navigate to="/login" />
    };
    return (
        <div>
            <ToastContainer toastStyle={toastStyle} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/commodity/:id" element={<CommodityHelp />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/login" element={<Login handleLogin={handleLogin} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/providers/:id" element={<ProviderHelp />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
