import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const change = (e)=>{
    e.preventDefault();
    const {name, value} = e.target;
    setData({...data, [name]: value});
  }

  const submit = async()=>{
    try {
      if(data.username==="" || data.email ==="" || data.password ===""){
        alert("All Fields are required");
      }
      else{
        const response = await axios.post("http://localhost:3000/api/v1/sign-in", data);
        console.log(response);
        navigate("/login");
        
      }
      setData({
        username: "",
        email: "",
        password: ""
      })
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <div className='h-[98vh] flex items-center justify-center '>
      <div className='w-2/7  bg-zinc-800 p-4 rounded-xl flex flex-col gap-4'>
        <div className="text-2xl flex justify-center">Sign Up</div>
        <hr className='w-full text-zinc-700' />
        <div className="flex flex-col gap-4 mt-8">
            <input type="text" name='username' onChange={change} value={data.username} placeholder='Enter Username' className='text-[22px] px-3 bg-zinc-700 w-full p-2 h-[50px] rounded-xl outline-none' />
            <input type="text" name='email' onChange={change} value={data.email} placeholder='Enter Email' className='text-[22px] px-3 bg-zinc-700 w-full p-2 h-[50px] rounded-xl outline-none' />
            <input type="password" name='password' onChange={change} value={data.password} placeholder='Enter password' className='text-[22px] px-3 bg-zinc-700 w-full p-2 h-[50px] rounded-xl outline-none' />
        </div>
        <button className=' hover:bg-blue-600 hover:cursor-pointer text-[24px] bg-blue-500 p-2 rounded-xl mt-8' onClick={submit}>Sign Up</button>
        <p className='text-[16px] mb-5 text-zinc-400'>Already have an account? <Link to={"/login"} className='text-blue-500 cursor-pointer transition-all duration-300'>Login</Link> </p>

      </div>
    </div>
  )
}

export default Signup
