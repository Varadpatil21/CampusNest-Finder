import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './AuthContext'; 
import { Home } from './pages/Home/Home';
import { Search } from './pages/Search';
import { Book } from './pages/Book/Book';
import { SignUp } from './components/SignUp/SignUp';
import { Login } from './components/Login/Login';
import { Reset } from './components/Reset/Reset';
import { Navbar } from './components/Navbar';
import { AddRoom } from './pages/AddRoom/AddRoom';
import {MyRoom} from './pages/MyRoom/MyRoom'
import {MyRoom1} from './pages/MyRoom1/MyRoom1'
import {Grid} from './components/Grid/Grid'

function App() {
  return (
    <AuthProvider> 
      <div>
        <Navbar />
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/book-room' element={<Book />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/add-room' element={<AddRoom />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgot' element={<Reset />} />
            <Route path='/myroom' element={<MyRoom />} />
            <Route path='/myroom1' element={<MyRoom1 />} />
            <Route path='/grid' element={<Grid/>} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
