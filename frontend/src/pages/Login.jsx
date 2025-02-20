import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
      <div className='h-[98vh] flex items-center justify-center '>
      <div className='w-2/7  bg-zinc-800 p-4 rounded-xl flex flex-col gap-4'>
        <div className="text-2xl flex justify-center">Login</div>
        <hr className='w-full text-zinc-700' />
        <div className="flex flex-col gap-4 mt-8">
            <input type="text" name='username' placeholder='Enter Username' className='text-[22px] px-3 bg-zinc-700 w-full p-2 h-[50px] rounded-xl outline-none' />
            <input type="text" name='password' placeholder='Enter password' className='text-[22px] px-3 bg-zinc-700 w-full p-2 h-[50px] rounded-xl outline-none' />
        </div>
        <button className='text-[24px] bg-blue-500 p-2 rounded-xl my-8'>Login</button>
        <p className='text-[16px] mb-5 text-zinc-400'>Don't have an account? <Link to={"/signup"} className='text-blue-500 cursor-pointer transition-all duration-300'>Signup</Link> </p>
      </div>
    </div>
    </div>
  )
}

export default Login
