// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home/Home';
import { Search } from './pages/Search';
import { Book } from './pages/Book';
import { SignUp } from './components/SignUp/SignUp';
import { Login } from './components/Login/Login';
import { Reset } from './components/Reset/Reset';
import { Navbar } from './components/Navbar'

function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/book-room' element={<Book />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot' element={<Reset />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
