import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Route,Routes,Router } from 'react-router-dom'
import './App.css'
import {Home} from './pages/Home/Home'
import {Search} from './pages/Search'
import {Book} from './pages/Book'
import {SignUp} from './components/SignUp/SignUp'
import {Login} from './components/Login/Login'
import { Reset } from './components/Reset/Reset'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
  <Navbar/>
  
  <div>
    <Routes>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/search' element={<Search/>}></Route>
      <Route path='/book-room' element={<Book/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/forgot' element={<Reset/>}></Route>
    </Routes>
  </div>
   </div>
  )
}

export default App
