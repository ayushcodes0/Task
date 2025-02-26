import React from 'react'
import Sidebar from '../components/Home/Sidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex h-[98vh] gap-2'>
      {/* This is my home page where I have first made sidebar which is common for all the pages */}
      <div className=' w-2/10 border border-zinc-700 p-4 rounded-xl flex flex-col justify-between'><Sidebar/></div>
      {/* This is my Outlet from where the routing happens for different pages */}
      <div className=' w-8/10 border border-zinc-700 p-4 rounded-xl'><Outlet/></div>
    </div>
  )
}

export default Home
