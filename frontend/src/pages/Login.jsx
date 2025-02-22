import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import {authActions} from '../store/auth.js'

const Login = () => {

  const [data, setData] = useState({
    username: "",
    password: ""
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const change = (e)=>{
    e.preventDefault();
    const {name, value} = e.target;
    setData({...data, [name]: value});
  }
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

  const submit = async()=>{
    try {
      if(data.username==="" || data.password ===""){
        alert("All Fields are required");
      }
      else{
        const response = await axios.post("http://localhost:3000/api/v1/login", data);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        navigate("/");

        
      }
      setData({
        username: "",
        password: ""
      })
    } catch (error) {
      // alert(error.response.data.message);
    }
  }


  return (
    <div>
      <div className='h-[98vh] flex items-center justify-center '>
      <div className='w-2/7  bg-zinc-800 p-4 rounded-xl flex flex-col gap-4'>
        <div className="text-2xl flex justify-center">Login</div>
        <hr className='w-full text-zinc-700' />
        <div className="flex flex-col gap-4 mt-8">
            <input value={data.username} onChange={change} type="text" name='username' placeholder='Enter Username' className='text-[22px] px-3 bg-zinc-700 w-full p-2 h-[50px] rounded-xl outline-none' />
            <input value={data.password} onChange={change} type="password" name='password' placeholder='Enter password' className='text-[22px] px-3 bg-zinc-700 w-full p-2 h-[50px] rounded-xl outline-none' />
        </div>
        <button className=' hover:bg-blue-600 hover:cursor-pointer text-[24px] bg-blue-500 p-2 rounded-xl my-8' onClick={submit}>Login</button>
        <p className='text-[16px] mb-5 text-zinc-400'>Don't have an account? <Link to={"/signup"} className='text-blue-500 cursor-pointer transition-all duration-300'>Signup</Link> </p>
      </div>
    </div>
    </div>
  )
}

export default Login
