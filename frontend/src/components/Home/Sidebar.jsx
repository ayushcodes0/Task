import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const data = [
        {
            title: "All task",
            link: "/"
        },
        {
            title: "Important task",
            link: "/importantTask"
        },
        {
            title: "Completed task",
            link: "/completedTask"
        },
        {
            title: "Incompleted task",
            link: "/incompletedTask"
        },
    ]

    const navigate = useNavigate();

    const logout = ()=>{
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        navigate("/signup")
    }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
            <h4 className='font-semibold text-[22px]'>ayushcodes0</h4>
            <p className='text-zinc-500 text-[16px]'>ayush94@gmail.com</p>
        </div>
        <hr className=' text-zinc-700' />
        <div className='flex flex-col gap-4 mt-4 text-zinc-400'>
            {
                data.map((item,index)=>{
                    return (
                        <Link to={item.link} key={index} className=" rounded p-2 text-[18px] hover:bg-zinc-600 transition-all duration-300">{item.title}</Link>
                    )
                })
            }
        </div>
      </div>
      <button className='bg-zinc-800 rounded-xl p-2 text-[16px] hover:scale-95 cursor-pointer transition-all duration-300' onClick={logout} >Log Out</button>
    </>
  )
}

export default Sidebar
