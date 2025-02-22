import React from 'react'
import { FaCircleNotch } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";







const Cards = ({home, setInputDiv, data}) => {
    // const data = [
    //     {
    //         title: "DSA Practice",
    //         desc: "I have to practice dsa from morning 8 to 12 and night 9 to 11",
    //         status: "complete",
    //         points: 100
    //     },
    //     {
    //         title: "DSA Practice",
    //         desc: "I have to practice dsa from morning 8 to 12 and night 9 to 11",
    //         status: "incomplete",
    //         points: 200
    //     },
    //     {
    //         title: "DSA Practice",
    //         desc: "I have to practice dsa from morning 8 to 12 and night 9 to 11",
    //         status: "complete",
    //         points: 300
    //     },
    //     {
    //         title: "DSA Practice",
    //         desc: "I have to practice dsa from morning 8 to 12 and night 9 to 11",
    //         status: "incomplete",
    //         points: 50
    //     },
    //     {
    //         title: "DSA Practice",
    //         desc: "I have to practice dsa from morning 8 to 12 and night 9 to 11",
    //         status: "incomplete",
    //         points: 200
    //     },
    // ]
    const handleComplete = ()=>{
        
    }
  return (
    <div className='grid grid-cols-4 gap-4'>
      {data && data.map((item,index)=>{
        return (
            <div key={index} className=" flex flex-col justify-between h-[250px] p-6 bg-zinc-800 rounded-4xl">
                <div className='flex flex-col gap-3'>
                    <h3 className='text-[22px] font-semibold'>{item.title}</h3>
                    <p className='text-zinc-400 text-[16px]'>{item.desc}</p>
                    <p className='text-zinc-300 text-[18px]'><span className='text-zinc-400'>points: </span> {item.points}</p>
                </div>
                <div className=' text-[22px] flex justify-between'>
                    <button className="text-red-400 cursor-pointer" onClick={handleComplete}>
                        {item.complete === false? <FaCircleNotch className='text-red-400' /> : <TiTick className='text-green-400 text-[24px]' /> }
                    </button>   
                    <button className="text-gray-500 cursor-pointer hover:text-red-500">
                        <FaHeart />
                    </button>
                    <button className="text-blue-500 cursor-pointer hover:text-blue-700">
                        <MdEdit />
                    </button>
                    <button className="text-gray-500 cursor-pointer hover:text-red-500">
                        <MdDelete />
                    </button>
                </div>
                
            </div>
        )
      })}
      {home==="true" && <button onClick={()=>setInputDiv("fixed")}  className=" flex flex-col gap-2 justify-center items-center h-[250px] p-6 bg-zinc-800 rounded-4xl hover:cursor-pointer hover:scale-95 transition-all duration-300">
            <IoAddOutline className='text-4xl text-black bg-zinc-400 rounded-4xl' />
            <h2 className='text-xl'>Add Task</h2>
      </button>}
      
      
    </div> 
  )
}

export default Cards
