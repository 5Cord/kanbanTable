import react from 'react'
import './App.css'
import { Link, Route, Routes } from "react-router-dom"
import Login from './page/login/login'
import Register from './page/register/Register'
import KanbanBoard from './components/KanbanBoard'

function App() {

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/Kanban">Kanban</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/Kanban' element={<KanbanBoard />} />
      </Routes>

    </>
  )
}

export default App
