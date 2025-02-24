import axios from 'axios';
import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";


const InputData = ({inputDiv,setInputDiv, fetchAllTasks}) => {
  const [data, setData] = useState({title: "", description: "", point: null})
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  const change = (e)=>{
    e.preventDefault();
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    })
  }

  const submit = async()=>{
    try {
      if(data.title === "" || data.description === "" || data.point === ""){
        alert("All fields are required");
      }
      else{
        await axios.post("http://localhost:3000/api/v2/create-task", data, {
          headers
        })
        
      }
      setInputDiv("hidden")
      setData({title: "", description: "" , point: 0})
      fetchAllTasks();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
        <div className={`${inputDiv} top-0 left-0 opacity-70 h-screen w-full bg-zinc-900`}></div>
        <div className={`${inputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
            <div className="bg-zinc-800 w-3/8 p-8 rounded-xl shadow-lg shadow-zinc-950 flex flex-col gap-5">
                <div className='flex justify-end mt-[-15px]'>
                    <button onClick={()=>setInputDiv("hidden")} className='text-zinc-500 cursor-pointer'><IoMdClose /></button>
                </div>
                <input onChange={change} value={data.title} type="text" placeholder='Enter title' name='title' className='w-full bg-zinc-700 px-3 py-2 rounded-xl text-[24px] outline-none' />
                <textarea onChange={change} value={data.description} name="description" placeholder='Enter description' cols="30" rows="10" className='w-full bg-zinc-700 px-3 py-1 rounded-xl resize-none text-[24px] outline-none'></textarea>
                <input onChange={change} value={data.point} type="number" placeholder='Enter point' name='point' className='w-full bg-zinc-700 px-3 py-2 rounded-xl text-[24px] outline-none' />
                <button onClick={submit}  className='bg-blue-500 py-1 rounded-xl hover:scale-95 transition-all duration-300 cursor-pointer'>Add</button>
            </div>
        </div>
    </>
  )
}

export default InputData
