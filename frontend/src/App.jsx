import {
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/register' element={<Register />}/>
        <Route exact path='/login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
