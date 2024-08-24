import {
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Board from './Board'
import Settings from './Settings'
import AddBook from './AddBook'
import ShowBook from './ShowBook'
import MyBooks from './MyBooks'
import UpdateBook from './UpdateBook'
import React,{useState} from 'react'
function App() {
  const [Authenticated,setAuth ] = useState(false)
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/register' element={<Register />}/>
        <Route exact path='/login' element={<Login auth={Authenticated} setAuth={setAuth}/>}/>
        <Route exact path='/board' element={<Board auth={Authenticated} setAuth={setAuth}/>} />
        <Route exact path='/settings' element={<Settings auth={Authenticated} setAuth={setAuth}/>}/>
        <Route exact path='/addbook' element={<AddBook auth={Authenticated} setAuth={setAuth}/>}/>
        <Route exact path='/showbook/:id' element={<ShowBook auth={Authenticated} setAuth={setAuth}/>}/>
        <Route exact path='/mybooks/:id' element={<MyBooks auth={Authenticated} setAuth={setAuth}/>}/>
        <Route exact path='/updatebook/:id' element={<UpdateBook auth={Authenticated} setAuth={setAuth}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
