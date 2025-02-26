import React from 'react'
import Sidebar from '../components/Home/Sidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex h-[98vh] p-4 gap-2 overflow-hidden'>
      {/* Fixed Sidebar */}
      <div className='fixed top-[3vh] left-[2vh] w-[20%] h-[94vh] border border-zinc-700 p-4 rounded-xl flex flex-col justify-between bg-zinc-900 overflow-hidden'>
        <Sidebar />
      </div>
      
      {/* Main Content (Outlet) with internal scroll */}
      <div className='ml-[22%] w-[78%] h-[94vh] border border-zinc-700 p-4 rounded-xl overflow-hidden'>
        <div className='h-full overflow-y-auto pr-2'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Home
