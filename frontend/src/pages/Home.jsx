import React from 'react'
import Sidebar from '../components/Home/Sidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex h-[98vh] gap-2'>
      <div className=' w-2/10 border border-zinc-700 p-4 rounded-xl flex flex-col justify-between'><Sidebar/></div>
      <div className=' w-8/10 border border-zinc-700 p-4 rounded-xl'><Outlet/></div>
    </div>
  )
}

export default Home
