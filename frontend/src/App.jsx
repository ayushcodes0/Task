import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alltask from './pages/Alltask';
import Importanttask from './pages/Importanttask'
import Completedtask from './pages/Completedtask'
import Incompletedtask from './pages/Incompletedtask'
import Signup from './pages/Signup';
import Login from './pages/Login';

const App = () => {
  return (
    <div class="bg-zinc-900 text-zinc-200 text-3xl h-screen p-2 relative ">
      <Router>
        <Routes>
          <Route exact path='/' element= {<Home/>}>
            <Route index element= {<Alltask/>}/>
            <Route path='/importantTask' element= {<Importanttask/>} />
            <Route path='/completedTask' element= {<Completedtask/>} />
            <Route path='/incompletedTask' element= {<Incompletedtask/>} />
          </Route>
          <Route path='/signup' element = {<Signup/>}/>
          <Route path='/login' element = {<Login/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
