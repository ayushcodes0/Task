import React, { useEffect } from 'react'
import Home from './pages/Home'
import { Routes, Route, useNavigate } from "react-router-dom";
import Alltask from './pages/Alltask';
import Importanttask from './pages/Importanttask'
import Completedtask from './pages/Completedtask'
import Incompletedtask from './pages/Incompletedtask'
import Signup from './pages/Signup';
import Login from './pages/Login';
import {useSelector} from "react-redux";

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  useEffect(() => {
    if(!isLoggedIn){
      navigate("/login");
    }
  }, [])
  
  return (
    <div className="bg-zinc-900 text-zinc-200 text-3xl h-screen p-2 relative ">
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
    </div>
  )
}

export default App
