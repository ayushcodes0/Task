import React, { useState } from 'react'
import Sidebar from '../components/Home/Sidebar'
import { Outlet } from 'react-router-dom'
import { HiMenuAlt3 } from 'react-icons/hi'
import { IoMdClose } from "react-icons/io";


const Home = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex h-[98vh] p-4 gap-2 overflow-hidden'>
      {!isOpen && (
        <button 
          className='fixed top-4 left-4 z-50 p-2 bg-zinc-800 rounded-md text-white md:hidden'
          onClick={() => setIsOpen(true)}
        >
          <HiMenuAlt3 size={24} />
        </button>
      )}

      <div className='hidden md:block fixed top-[3vh] left-[2vh] w-[20%] h-[94vh] border border-zinc-700 p-4 rounded-xl flex flex-col justify-between bg-zinc-900 overflow-hidden'>
        <Sidebar />
      </div>

      <div className={`fixed top-0 left-0 h-full w-[250px] bg-zinc-900 p-4 border-r border-zinc-700 transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}>
        <Sidebar />
        <button 
          className="absolute top-4 right-4 text-white"
          onClick={() => setIsOpen(false)}
        >
          < IoMdClose/>
        </button>
      </div>

      <div className='w-full md:w-[78%] md:ml-[22%]  h-[94vh] border border-zinc-700 p-4 rounded-xl overflow-hidden'>
        <div className='h-full overflow-y-auto pr-2'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Home
